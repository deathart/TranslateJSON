const fs = require("fs")

module.exports = class Translate {

	constructor(files, Directory = "./locales") {
		this.file = files
		this.error = true
		this.location = Directory
		this.loc = `${this.location + this.file}.json`

		try {
			const fileContent = fs.readFileSync(this.loc)
			this.data = JSON.parse(fileContent)
			this.error = false
		} catch (err) {
			throw new Error("[ERROR] : The translation of the '" + files+ "' file is not found !")
		}
	}

	GetLine(Lines, replace = null) {
		if (!this.error) {
		    if(this.resolve(Lines)) {
				if (replace !== null) {
					return this.resolve(Lines).replace("%s", replace)
				} else {
					return this.resolve(Lines)
				}
			}
			else {
		        return false
			}
		}
	}

	GetBlock(Lines, replaces = null) {
        if (!this.error) {
			const result = this.resolve(Lines)
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
        if (!this.error) {
			if (this.resolve(key) !== false) {
				this.data[key] = value
				try {
					fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
					return true
				} catch (err) {
					throw new Error("[ERROR] : Unable to add a key")
				}
			}
			else {
				throw new Error("[ERROR] : The key already exists")
			}
		}
	}

	Update(key, value) {
        if (!this.error) {
			let res = this.resolve(key)
			if (res) {
				res = value
				try {
					fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
					return true
				} catch (err) {
					throw new Error("[ERROR] : Unable to change key")
				}
			}
			else {
				throw new Error("[ERROR] : The key does not exist")
			}
		}
	}

	Del(key) {
        if (!this.error) {
			if (this.resolve(key)) {
				delete this.resolve(key)
				try {
					fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
					return true
				} catch (err) {
					throw new Error("[ERROR] : Can't delete key")
				}
			} else {
				throw new Error("[ERROR] : The key does not exist")
			}
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
