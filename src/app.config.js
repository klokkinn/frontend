class AppConfig {
	constructor() {
		let env

		if (window.env !== undefined) env = window.env
		else env = import.meta.env

		this.BASE_URL = env.VITE_BASE_URL
		this.GATEKEEPER_URL = env.VITE_GATEKEEPER_URL
		this.TIME_SERVICE_URL = env.VITE_TIME_SERVICE_URL
	}
}

export default new AppConfig()
