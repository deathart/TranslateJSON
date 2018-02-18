const fs = require("fs");

module.exports = class Translate {

	/**
     * Initialize the class
     *
     * @param files
     * @param Directory
     * @throws Will throw an error if file does not exist
     */
	constructor(files, Directory = "./locales/") {
		this.error = true;
		this.location = Directory;
		this.loc = `${this.location + files}.json`;

		try {
			this.data = JSON.parse(fs.readFileSync(this.loc));
			this.error = false
		} catch (err) {
			throw new Error("[ERROR] : The translation of the '" + files+ "' file is not found !")
		}
	}

	/**
     * Get Line
     *
     * @param Lines
     * @param replace
     * @throws Will throw an error if key does not exist
     * @returns {string}
     * @constructor
     */
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

	/**
     * Get block
     *
     * @param Lines
     * @param replaces
     * @throws Will throw an error if block does not exist
     * @returns {string}
     * @constructor
     */
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

	/**
     * Add key
     *
     * @param key
     * @param value
     * @throws Will throw an error if key already exists
     * @returns {boolean}
     * @constructor
     */
	SetLine(key, value) {
		if (!this.error && this.resolve(key) !== false) {
			this.data[key] = value;
			fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2));
			return true
		}
		else {
			throw new Error("[ERROR] : This key already exists")
		}
	}

	/**
     * Update key
     *
     * @param key
     * @param value
     * @throws Will throw an error if key does not exist
     * @returns {boolean}
     * @constructor
     * @todos Redesign of the function to allow to change the key
     */
	Update(key, value) {
		if (!this.error && this.resolve(key)) {
        	let res = this.resolve(key);
			res = value;
			fs.writeFileSync(this.loc, JSON.stringify(res, null, 2));
			return true
		}
		else {
			throw new Error("[ERROR] : This key does not exist")
		}

	}

	/**
     * Delete key
     *
     * @param key
     * @throws Will throw an error if key does not exist
     * @returns {boolean}
     * @constructor
     */
	Del(key) {
		if (!this.error && this.resolve(key)) {
			delete this.resolve(key);
			fs.writeFileSync(this.loc, JSON.stringify(this.data, null, 2));
			return true
		} else {
			throw new Error("[ERROR] : This key does not exist")
		}

	}

	/**
     * Resolve value by key
     * @param key
     * @returns {(string|boolean)} return bool if the key does not exist
     */
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
};
