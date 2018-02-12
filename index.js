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

	GetBlock(Lines, replaces = null) {
        if (this.error === false) {

            let result = Lines.split('.').reduce(function(prev, curr) {
                if(prev) {
                    return prev[curr];
                }
                else {
                    return false;
                }
            }, JSON.parse(this.data) || self);

            if(result) {
                if (replaces) {
                    if (this.debug === true) {
                        console.debug(`[DEBUG] : ${result.replace("%s", replaces)}`)
                    }
                    return result.replace("%s", replaces)
                }
                else {
                    if (this.debug === true) {
                        console.debug(`[DEBUG] : ${result}`)
                    }
                    return result;
                }
            }
            return false;
        }
        return false
	}

    resolve(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null
        }, obj || self)
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
