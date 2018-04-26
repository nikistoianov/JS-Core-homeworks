class LineManager {
    constructor(stops){
        this.stops = stops
        this.currentStop = 0
        this.duration = 0

        this._currentDuration = 0
        this._currentDelay = 0
        this._validateStops()
    }

    _validateStops(){
        for (let stop of this.stops) {
            let num = Number(stop.timeToNext)
            if (stop.name === "" || isNaN(num) || stop.timeToNext === undefined || num < 0) {
                throw new Error('Invalid stop!')
            }
        }
    }

    get atDepot() {
        return this.currentStop === this.stops.length - 1
    }

    get nextStopName() {
        if (this.atDepot) {
            return 'At depot'
        } else {
            return this.stops[this.currentStop + 1].name
        }
    }

    get currentDelay() {
        return this._currentDelay
    }

    arriveAtStop(minutes) {
        let num = parseInt(minutes)
        if (this.atDepot) {
            throw new Error('last stop reached')
        }
        if (num < 0) {
            throw new Error('minutes cannot be negative')
        }

        this._currentDuration += this.stops[this.currentStop].timeToNext
        this.currentStop++
        this.duration += num
        this._currentDelay = this.duration - this._currentDuration

        if (this.atDepot) {
            return false
        } else {
            return true
        }
    }

    toString() {
        let nextStop = this.atDepot ? '- Course completed\n' : `- Next stop: ${this.nextStopName}\n`
        return 'Line summary\n' +
            nextStop +
            `- Stops covered: ${this.currentStop}\n` +
            `- Time on course: ${this.duration} minutes\n` +
            `- Delay: ${this.currentDelay} minutes`
    }
}

