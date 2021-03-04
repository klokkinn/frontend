export class TimeEntry {
	constructor({ id, start, end } = { id: '', start: 0, end: 0 }) {
		this.id = id
		this.start = start
		this.end = end
	}
	
	StartTime() {
		const start = new Date(Date.now())
		
		const hours = start.getHours()
		const hoursString = hours >= 10 ? `${hours}` : `0${hours}`
		
		const minutes = start.getMinutes()
		const minutesString = minutes >= 10 ? `${minutes}` : `0${minutes}`
		
		return `${hoursString}:${minutesString}`
	}
	
	Duration(end = this.end) {
		const start = new Date(this.start)
		const now = new Date(end)
		
		const diff = now - start

		const seconds = Math.floor(diff / 1000)
		const minutes = Math.floor(seconds / 60)
		const hours = Math.floor(minutes / 60)
		
		return `${hours}h${minutes - hours * 60}m`
	}
	
	isCheckedIn() {
		return this.start !== 0
	}
}
