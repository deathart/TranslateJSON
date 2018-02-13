const fs = require("fs")

module.exports = class Translate {
	constructor(files, Directory = "./locales") {
		this.file = files
		this.error = false
		this.location = Directory
		this.loc = `${this.location + this.file}.json`

		try {
			this.data = fs.readFileSync(this.loc)
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
					return JSON.parse(this.data)[Lines].replace("%s", replace)
				} catch (error) {
					return false
				}
			} else {
				if (typeof JSON.parse(this.data)[Lines] !== "undefined") {
					return JSON.parse(this.data)[Lines]
				}

				return false
			}
		}
		return false
	}

	GetBlock(Lines, replaces = null) {
		if (this.error === false) {
			const result = Lines.split(".").reduce((prev, curr) => {
				if (prev) {
					return prev[curr]
				}

				return false
			}, JSON.parse(this.data) || self)

			if (result) {
				if (replaces) {
					return result.replace("%s", replaces)
				}

				return result
			}
			return false
		}
		return false
	}

	resolve(path, obj) {
		return path.split(".").reduce((prev, curr) => (prev ? prev[curr] : null), obj || self)
	}

	SetLine(key, value) {
		const jsonObj = JSON.parse(this.data)

		jsonObj[key] = value

		try {
			fs.writeFileSync(this.loc, JSON.stringify(jsonObj, null, 2))
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
