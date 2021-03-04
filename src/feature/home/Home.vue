<template>
	<div class="Home">
		<EntryInfoBox :entry="timeEntry" />

		<div class="button-container">
			<button
				class="btn primary"
				v-if="!timeEntry.isCheckedIn()"
				@click="checkIn"
			>
				Check in
			</button>
			<button class="btn secondary" v-else @click="checkOut">Check out</button>
		</div>
	</div>
</template>

<script>
import { TimeEntry } from '~/store/time/models'
import EntryInfoBox from '~/feature/home/components/EntryInfoBox.vue'

export default {
	name: 'Home',
	components: { EntryInfoBox },
	data: () => ({
		timeEntry: new TimeEntry(),
	}),
	methods: {
		async checkIn() {
			this.timeEntry = await this.$store.dispatch('time/checkIn')
		},
		async checkOut() {
			await this.$store.dispatch('time/checkOut', this.timeEntry.id)

			this.timeEntry = new TimeEntry()
		},
	},
}
</script>

<style lang="scss" scoped>
@import 'src/assets/css/theme';

.Home {
}

.button-container {
	margin-top: 1em;
}
</style>
