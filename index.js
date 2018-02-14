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
		if (this.error === false) {
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
		if (this.error === false) {
            if (this.resolve(key) !== false) {
                this.data[key] = value
                try {
                    fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
                    return true
                } catch (err) {
                    return false
                }
            }
            return false
		}
	}

	Update(key, value) {
		if (this.error === false) {
            let res = this.resolve(key);
			if (res) {
                res = value
				try {
					fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2))
					return true
				} catch (err) {
					return false
				}
			}
			else {
				return false
			}
		}
	}

	Del(key) {
		if (this.error === false) {
			if (this.resolve(key)) {
				delete this.resolve(key)
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

    resolve(key) {
        if (key.indexOf('.') > -1) {
            return key.split('.').reduce(function (prev, curr) {
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
