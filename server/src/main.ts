import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { DockerContainerManager } from './plugins/code/code-runner/docker-container-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('/doatask/api')
  const port = process.env.NEST_PORT

  // In the *.entity.ts files we use @ApiProperty({ type: Number }) for
  // relations because otherwise Swagger follows the relation, reaches an
  // entity, follow its relations and so on.
  const config = new DocumentBuilder()
    .setTitle('Doatask API')
    .setDescription('The doatask API description. Please note that due to a swagger limitation the relations of the entities are not correctly displayed.')
    .setVersion('0.8')
    .addTag('doatask')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync("./swagger-spec.json", JSON.stringify(document));

  // api doc will be served at http://example.com/apidoc
  // api doc as json at http://example.com/apidoc-json
  SwaggerModule.setup('apidoc', app, document);

  // Get information about the docker containers from the docker-compose file
  DockerContainerManager.init(process.env.PATH_TO_DOCKER_COMPOSE)

  await app.listen(port)
  console.log(`Application is running on: ${await app.getUrl()}`)
  console.log(`NODE_ENV is ${process.env.NODE_ENV}`)
}
bootstrap()
