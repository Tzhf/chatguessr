const store = require('./sharedStore');

/**
 * @typedef {object} SettingsProps
 * @prop {string} channelName
 * @prop {string} botUsername
 * @prop {string} token
 * @prop {string} cgCmd
 * @prop {string} cgMsg
 * @prop {string} userGetStatsCmd
 * @prop {string} userClearStatsCmd
 * @prop {string} setStreakCmd
 * @prop {boolean} showHasGuessed
 * @prop {boolean} isMultiGuess
 * @prop {boolean} noCar
 * @prop {boolean} noCompass
 */

class Settings {
    /** @param {Partial<SettingsProps>} settings */
	constructor({
		channelName = "",
		botUsername = "",
		token = "",
		cgCmd = "!cg",
		cgMsg = "To play along, go to this link, pick a location, and paste the whole command into chat: <your cg link>",
		userGetStatsCmd = "!me",
		userClearStatsCmd = "!clear",
		setStreakCmd = "!setstreak",
		showHasGuessed = true,
		isMultiGuess = false,
		noCar = false,
		noCompass = false
    } = {}) {
		this.channelName = channelName;
		this.botUsername = botUsername;
		this.token = token;
		this.cgCmd = cgCmd;
		this.cgMsg = cgMsg;
		this.userGetStatsCmd = userGetStatsCmd;
		this.userClearStatsCmd = userClearStatsCmd;
		this.setStreakCmd = setStreakCmd;
		this.showHasGuessed = showHasGuessed;
		this.isMultiGuess = isMultiGuess;
		this.noCar = noCar;
		this.noCompass = noCompass;
	}

	/**
	 * @param {boolean} isMultiGuess
	 * @param {boolean} noCar
	 * @param {boolean} noCompass
	 */
	setGameSettings(isMultiGuess, noCar, noCompass) {
		this.isMultiGuess = isMultiGuess;
		this.noCar = noCar;
		this.noCompass = noCompass;
        this.save();
	}

	/**
	 * @param {Object} commands
	 */
	setTwitchCommands(commands) {
		this.cgCmd = commands.cgCmdd;
		this.cgMsg = commands.cgMsgg;
		this.userGetStatsCmd = commands.userGetStats;
		this.userClearStatsCmd = commands.userClearStats;
		this.setStreakCmd = commands.setStreak;
		this.showHasGuessed = commands.showHasGuessed;
        this.save();
	}

	/**
	 * @param {string} channelName
	 * @param {string} botUsername
	 * @param {string} token
	 */
	setTwitchSettings(channelName, botUsername, token) {
		this.channelName = channelName;
		this.botUsername = botUsername;
		this.token = token;
        this.save();
	}

    toJSON() {
        return {
            channelName: this.channelName,
            botUsername: this.botUsername,
            token: this.token,
            cgCmd: this.cgCmd,
            cgMsg: this.cgMsg,
            userGetStatsCmd: this.userGetStatsCmd,
            userClearStatsCmd: this.userClearStatsCmd,
            setStreakCmd: this.setStreakCmd,
            showHasGuessed: this.showHasGuessed,
            isMultiGuess: this.isMultiGuess,
            noCar: this.noCar,
            noCompass: this.noCompass,
        }
    }

    static read() {
        return new Settings(store.get('settings'));
    }

    /** @private */
    save() {
        store.set('settings', this.toJSON());
    }
}

module.exports = Settings;