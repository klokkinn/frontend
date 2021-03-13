import { TimeEntry } from './models'

import { nanoid } from 'nanoid'

const state = () => ({
	entries: []
})

const actions = {
	async refresh() {
	},
	async checkIn({ commit }) {
		const entry = new TimeEntry()

		entry.id = nanoid()
		entry.start = Date.now()

		commit('entry', entry)

		return entry
	},
	async checkOut({ commit, getters, state }, id) {
		const entry = state.entries[getters.entryIndex(id)]

		entry.end = Date.now()

		commit('entry', entry)
	}
}

const mutations = {
	entry(state, entry) {
		const existingIndex = getters.entryIndex(state)(entry.id)

		if (existingIndex !== -1) {
			state.entries.splice(existingIndex, 1)
		}

		state.entries.push(entry)
	}
}

const getters = {
	entryIndex: state => id => state.entries.findIndex(entry => entry.id === id)
}

export default {
	namespaced: true,
	actions,
	getters,
	mutations,
	state
}
