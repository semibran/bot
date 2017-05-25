const { runInNewContext: run } = require('vm')
const { inspect } = require('util')
const bench = require('bench')
const Discord = require('discord.js')
const client = new Discord.Client()
const token = process.argv[2]
const open = '```js'
const close = '```'

var options = { depth: 1, maxArrayLength: 10 }
var initial = { bench, reset, console: { log } }
var context = null
var channel = null

function reset() {
	context = Object.assign({}, initial)
}

function log(value) {
	channel.send(open + '\n' + value + close)
}

reset()

client.login(token)

client.on('ready', _ => console.log(`logged in with token '${token}'`))

client.on('message', message => {
	if (message.author !== client.user) {
		var string = message.content
		if (string.startsWith(open) && string.endsWith(close)) {
			var script = string.slice(open.length, string.length - close.length).trim()
			var result = null

			channel = message.channel

			try {
				result = run(script, context)
			}

			catch (error) {
				log(error)
			}

			if (result != null) {
				log(inspect(result, options))
			}
		}
	}
})
