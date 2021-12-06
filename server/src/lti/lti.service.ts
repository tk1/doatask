
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { Request, Response, NextFunction } from 'express';
import * as ltijs from 'ltijs'
import * as Database from 'ltijs-sequelize'
import * as express from 'express'

@Injectable()
export class LtiService {
  private readonly lti

  constructor(private configService: ConfigService) {
    const LTI_KEY = this.configService.get<string>('LTI_KEY')
    const inProduction = this.configService.get<string>('NODE_ENV') === 'production'
    process.env.DEBUG = 'provider:*'

    this.lti = ltijs.Provider

    let host = this.configService.get<string>('POSTGRES_HOST')
    if (this.configService.get<string>('POSTGRES_ON_LOCALHOST') === 'true') {
      host = 'localhost'
    }
    const db = new Database(
      this.configService.get<string>('LTI_DB_NAME'),
      this.configService.get<string>('LTI_DB_USER'),
      this.configService.get<string>('LTI_DB_PASSWORD'),
      {
        host,
        dialect: 'postgres',
        logging: false
      })

    // Setup
    this.lti.setup(LTI_KEY,
      {
        plugin: db
      }, {
      cookies: {
        // Set secure to true if the testing platform is in a different domain and https is being used
        secure: inProduction,
        // Set sameSite to 'None' if the testing platform is in a different domain and https is being used
        sameSite: ''
      },
      // Set devMode to true if the testing platform is in a different domain and https is not being used
      devMode: !inProduction
    })

    // When receiving successful LTI launch redirects to app
    this.lti.onConnect(async (token, req, res, next) => {
      const query: any = {
        username: token.userInfo.name,
        contextId: token.platformContext.context.id,
        contextLabel: token.platformContext.context.label,
        contextTitle: token.platformContext.context.title
      }
      if (token.platformContext.custom?.assignmentsolve) {
        query.assignmentsolve = token.platformContext.custom.assignmentsolve
      }
      if (token.platformContext.custom?.as) {
        query.assignmentsolve = token.platformContext.custom.as
      }
      return this.lti.redirect(
        res,
        this.configService.get<string>('LTI_REDIRECT_URL'),
        { query }
      )
    })

    const router = express.Router()
    router.all(/.*/, (req, res, next) => {
      next()
    }
    )
    this.lti.app.use(router)
    this.lti.deploy({ serverless: true })
  }

  async registerPlatform(data: any) {
    const baseUrl = data.url
    try {
      const platform = await this.lti.registerPlatform({
        url: baseUrl,
        name: data.name,
        clientId: data.clientId,
        authenticationEndpoint: `${baseUrl}/mod/lti/auth.php`,
        accesstokenEndpoint: `${baseUrl}/mod/lti/token.php`,
        authConfig: { method: 'JWK_SET', key: `${baseUrl}/mod/lti/certs.php` }
      })
      // const authConfig = await platform.platformAuthConfig()
      // console.log(authConfig)
      // console.log(await platform.platformJSON())
      return { status: 'ok' }
    } catch (error) {
      return { status: error.message }
    }

  }

  route(req, res, next) {
    this.lti.app(req, res, next);
  }

  async grade(idtoken: any, score: number, label: string) {

    try {
      // Creating Grade object
      const gradeObj = {
        userId: idtoken.user,
        scoreGiven: score,
        scoreMaximum: 100,
        activityProgress: 'Completed',
        gradingProgress: 'FullyGraded'
      }


      let lineItemId = idtoken.platformContext.endpoint.lineitem // Attempting to retrieve it from idtoken
      if (!lineItemId) {
        const response = await this.lti.Grade.getLineItems(idtoken, { resourceLinkId: true })
        const lineItems = response.lineItems
        const lineItemForLabel = lineItems.find(v => v.label === label)
        if (!lineItemForLabel) {
          // Creating line item if there is none
          const newLineItem = {
            scoreMaximum: 100,
            label,
            tag: 'tag-grade',
            resourceLinkId: idtoken.platformContext.resource.id
          }
          const lineItem = await this.lti.Grade.createLineItem(idtoken, newLineItem)
          lineItemId = lineItem.id
        } else lineItemId = lineItemForLabel.id
      }

      // Sending Grade
      const responseGrade = await this.lti.Grade.submitScore(idtoken, lineItemId, gradeObj)
      return responseGrade
    } catch (err) {
      console.log(err.message)
      return err
    }
  }

}





