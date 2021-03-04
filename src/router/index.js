import { createRouter, createWebHistory } from 'vue-router'

import config from '~/app.config'
import store from '~/store'

import Home from '~/feature/home/Home.vue'

const routes = [{ path: '/', component: Home }]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach(async (to, from, next) => {
	await store.dispatch('auth/refresh')

	if (!store.getters['auth/isAuthenticated'])
		await store.dispatch('auth/login', `${config.BASE_URL}/${to.fullPath}`)

	next()
})

export default router
