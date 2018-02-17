const fs = require("fs")

module.exports = class Translate {

	constructor(files, Directory = "./locales") {
		this.file = files
		this.error = true
		this.location = Directory
		this.loc = `${this.location + this.file}.json`

		try {
			this.data = JSON.parse(fs.readFileSync(this.loc))
			this.error = false
		} catch (err) {
			throw new Error("[ERROR] : The translation of the '" + files+ "' file is not found !")
		}
	}

	GetLine(Lines, replace = null) {
		if(!this.error && this.resolve(Lines)) {
			if (replace !== null) {
				return this.resolve(Lines).replace("%s", replace)
			} else {
				return this.resolve(Lines)
			}
		}
		else {
			throw new Error("[ERROR] : This key doesn't exist")
		}

	}

	GetBlock(Lines, replaces = null) {

		if (!this.error && this.resolve(Lines)) {
			if (replaces) {
				return this.resolve(Lines).replace("%s", replaces)
			}
			return this.resolve(Lines)
		}
		else {
			throw new Error("[ERROR] : This block doesn't exist")
		}
	}

	SetLine(key, value) {
		if (!this.error && this.resolve(key) !== false) {
			this.data[key] = value
			fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
			return true
		}
		else {
			throw new Error("[ERROR] : This key already exists")
		}
	}

	Update(key, value) {
		if (!this.error && this.resolve(key)) {
        	let res = this.resolve(key)
			res = value
			fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
			return true
		}
		else {
			throw new Error("[ERROR] : This key does not exist")
		}

	}

	Del(key) {
		if (!this.error && this.resolve(key)) {
			delete this.resolve(key)
			fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
			return true
		} else {
			throw new Error("[ERROR] : This key does not exist")
		}

	}

	resolve(key) {
		if (key.indexOf(".") > -1) {
			return key.split(".").reduce(function (prev, curr) {
				return prev ? prev[curr] : false
			}, this.data)
		}
		else {
			if (typeof this.data[key] !== "undefined") {
				return this.data[key]
			} else {
				return false
			}
		}
	}
}
