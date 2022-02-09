# Muzzy
Muzzy is a discord music bot developed using discord.js that allows you to play music via the youtube search API.

# Getting Started
* Installing the dependencies
	`npm install` - To install all the dependencies in package.json.

* Creating config.json
	> Create a file named config.json inside the src directory.
	> The config file show have the following content:
	```javascript
	{ 
		"prefix": "!",
		"token":"<your_discord_bot_token>",
		"YT_API_KEY":"<your_youtube_api_key>"
	}
	```
* Running the project
	`npm run dev`

# Bot Commands
* `!play <song_name>` - To play a song.
* `!skip` - To skip the current song in the queue.
* `!stop` - To stop the music and delete the queue.
* `!queue` - To view the songs in the queue.