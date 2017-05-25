# bot
> [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) bot for [Discord](https://discordapp.com)

## setup
After cloning this repository and installing dependencies, run `node . YOUR_CLIENT_TOKEN` to start the bot.

## usage
Once the bot is online, send a message with your code inside triple backticks flagged as JavaScript (```js) to execute a script.

The context exposes the methods `console.log`, `reset` (to reset the context to its initial state), and [`bench`](https://github.com/semibran/bench).

## license
MIT
