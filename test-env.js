const shell = require('shelljs')
const envFile = 'server/.env'
if (!shell.test('-f',envFile)) {
  shell.echo(`error: no ${envFile} file`)
  shell.exit(1)
}
shell.exit(0)