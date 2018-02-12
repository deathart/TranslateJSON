const fs = require("fs")

module.exports = class Translate {
	constructor(files, params = {}) {
		this.file = files
		this.error = false
		this.location = params.Directory || "./locales/"
		this.ext = params.exts || ".json"
		this.debug = params.debug || false
		this.loc = this.location + this.file + this.ext

		try {
			this.data = fs.readFileSync(this.loc)
			if (this.debug === true) {
				console.info(`[DEBUG] : ${this.loc} load success !\r\n content : ${this.data}`)
			}
		} catch (err) {
			this.error = true
			if (err.code === "ENOENT") {
				console.error(`[ERROR] : Translation file not found ! (${this.loc})`)
			} else {
				console.error(`[ERROR] : (${err})`)
			}
		}
	}

	GetLine(Lines, replace = null) {
		if (this.error === false) {
			if (replace !== null) {
				try {
					if (this.debug === true) {
						console.debug(`[DEBUG] : ${JSON.parse(this.data)[Lines].replace("%s", replace)}`)
					}
					return JSON.parse(this.data)[Lines].replace("%s", replace)
				} catch (error) {
					return false
				}
			} else {
				if (typeof JSON.parse(this.data)[Lines] !== "undefined") {
					if (this.debug === true) {
						console.debug(`[DEBUG] : ${JSON.parse(this.data)[Lines]}`)
					}
					return JSON.parse(this.data)[Lines]
				}

				return false
			}
		}
		return false
	}

	GetBlock(Lines, Block, replace = null) {
		if (this.error === false) {
			if (replace !== null) {
				try {
					if (this.debug === true) {
						console.debug(`[DEBUG] : ${JSON.parse(this.data)[Block][Lines].replace("%s", replace)}`)
					}
					return JSON.parse(this.data)[Block][Lines].replace("%s", replace)
				} catch (error) {
					return false
				}
			} else {
				if (typeof JSON.parse(this.data)[Block] !== "undefined" && typeof JSON.parse(this.data)[Block][Lines] !== "undefined") {
					if (this.debug === true) {
						console.debug(`[DEBUG] : ${JSON.parse(this.data)[Block][Lines]}`)
					}
					return JSON.parse(this.data)[Block][Lines]
				}

				return false
			}
		}
		return false
	}

	SetLine(key, value) {
		const jsonObj = JSON.parse(this.data)

		jsonObj[key] = value

		try {
			fs.writeFileSync(this.loc, JSON.stringify(jsonObj, null, 2))
			if (this.debug === true) {
				console.debug(`[DEBUG] : ${key} : ${value}`)
			}
			return true
		} catch (err) {
			return false
		}
	}

	Del(json_value = {}) {
		const jsonObj = JSON.parse(this.data)

		if (typeof jsonObj[json_value] !== "undefined") {
			delete jsonObj[json_value]

			fs.writeFile(this.loc, JSON.stringify(jsonObj, null, 2), (err) => {
				if (!err) {
					if (this.debug === true) {
						console.debug(`[DEBUG] : Line ${json_value} is delete`)
					}
					return true
				}
				console.error(`[ERROR] : Line ${json_value} not found`)
				return false
			})
		} else {
			return false
		}
	}
}
