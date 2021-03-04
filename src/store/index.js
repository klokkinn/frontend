import { createStore } from 'vuex'

import auth from './auth'
import time from './time'

const store = createStore({
	modules: {
		auth,
		time,
	},
})

export default store
