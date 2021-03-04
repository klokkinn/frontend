export class User {
	constructor(raw = { sub: null, email: null }) {
		this.id = raw.sub
		this.email = raw.email
	}

	isValid() {
		return this.id !== null
	}
}
