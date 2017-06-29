const run = require('vm').runInNewContext
const Discord = require('discord.js')
const request = require('http').request
const inspect = require('util').inspect
const options = { depth: 1, maxArrayLength: 10 }
const client = new Discord.Client()
const token = process.argv[2]
const open = '```js'
const close = '```'

var channel = null
var context = {
  aids: require('./commands/aids'),
  kern: require('./commands/kern'),
  console: {
    log: value => {
      channel.send(`${open}\n${value}\n${close}`)
    }
  },
  npm: name => {
    request(`http://registry.npmjs.org/${name}`, response => {
      var status = response.statusCode === 200 ? 'taken' : 'free'
      context.console.log(`package '${name}' ${status}`)
      channel.send(`https://www.npmjs.com/package/${name}`)
    }).end()
  }
}

client.login(token)
client.on('ready', _ => console.log(`logged in with token '${token}'`))
client.on('message', message => {
  channel = message.channel
  if (message.author === client.user) return
  if (channel.name !== 'repl') return
  var script = message.content.trim()
  var result = null
  var failed = false
  var time = process.hrtime()
  try {
    result = run(script, context)
  }
  catch (error) {
    result = error
    failed = true
  }
  finally {
    var [seconds, nanoseconds] = process.hrtime(time)
    if (!failed) {
      result = inspect(result, options)
    }
    channel.send(`
<@${message.author.id}>

**input**
${open}
${message.content}
${close}
**output**
${open}
${result}
${close}
**completed in ${seconds}s + ${nanoseconds}ns**`
    )
  }
})
