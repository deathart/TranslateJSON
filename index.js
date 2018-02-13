const fs = require("fs")

module.exports = class Translate {
	constructor(files, Directory = "./locales") {
		this.file = files
		this.error = false
		this.location = Directory
		this.loc = `${this.location + this.file}.json`

		try {
			const fileContent = fs.readFileSync(this.loc)
			this.data = JSON.parse(fileContent)
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
					return this.data[Lines].replace("%s", replace)
				} catch (error) {
					return false
				}
			} else {
				if (typeof this.data[Lines] !== "undefined") {
					return this.data[Lines]
				}
				return false
			}
		}
	}

	GetBlock(Lines, replaces = null) {
		if (this.error === false) {
			const result = Lines.split(".").reduce((prev, curr) => {
				if (prev) {
					return prev[curr]
				}

				return false
			}, this.data || self)
			if (result) {
				if (replaces) {
					return result.replace("%s", replaces)
				}

				return result
			}
			return false
		}
	}

	SetLine(key, value) {
		if (this.error === false) {
			this.data[key] = value
			try {
				fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
				return true
			} catch (err) {
				return false
			}
		}
	}

	Del(json_value = {}) {
		if (this.error === false) {
			if (typeof this.data[json_value] !== "undefined") {
				delete this.data[json_value]
				try {
					fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
					return true
				} catch (err) {
					return false
				}
			} else {
				return false
			}
		}
	}
}
