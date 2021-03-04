<template>
	<div class="EntryInfoBox">
		<div class="name">
			<span>In</span>
			<span>Duration</span>
		</div>
		<div class="value">
			<span>{{ start }}</span>
			<span>{{ duration }}</span>
		</div>
	</div>
</template>

<script>
import { TimeEntry } from '~/store/time/models'

export default {
	name: 'EntryInfoBox',
	props: {
		entry: {
			type: TimeEntry,
			required: true,
		},
	},
	computed: {
		start() {
			if (!this.entry.isCheckedIn()) return '-'

			return this.entry.StartTime()
		},
		duration() {
			if (!this.entry.isCheckedIn()) return '-'

			return this.entry.Duration(this.now)
		},
	},
	data: () => ({
		now: 0,
	}),
	created() {
		// Ensures duration computed value gets updated
		setInterval(() => (this.now = Date.now()), 1000)
	},
}
</script>

<style lang="sass" scoped>
@import 'src/assets/css/theme'

.EntryInfoBox
	padding: 1em

	border: 2px solid $primary-color
	border-radius: 4px

	display: flex
	justify-content: space-between

	text-align: left

	cursor: pointer

span:not(:last-child)
	margin-bottom: 1em

.name
	display: flex
	flex-direction: column

.value
	display: flex
	flex-direction: column
</style>
