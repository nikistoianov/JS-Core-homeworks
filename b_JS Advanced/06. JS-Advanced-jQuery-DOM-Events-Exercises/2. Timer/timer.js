function timer() {
    let timer
    let timerStarted = false
    let startBtn = $('#start-timer')
    startBtn.on('click', function () {
        if (!timerStarted)
            timer = setInterval(step, 1000)
        timerStarted = true
    })

    let stopBtn = $('#stop-timer')
    stopBtn.on('click', function () {
        clearInterval(timer)
        timerStarted = false
    })

    function step() {
        let increment = 1
        let seconds = $('#seconds')
        let sec = +seconds.text() + increment

        if (sec > 59) {
            sec -= 60
            let minutes = $('#minutes')
            let min = +minutes.text() + increment
            if (min > 59) {
                min -= 60
                let hours = $('#hours')
                let hrs = +hours.text() + increment
                hours.text(hrs < 10 ? '0' + hrs : hrs)
            }
            minutes.text(min < 10 ? '0' + min : min)
        }
        seconds.text(sec < 10 ? '0' + sec : sec)
    }
}

function timer_k() {
    let hoursSpan = $('#hours');
    let minutesSpan = $('#minutes');
    let secondsSpan = $('#seconds');
    let startBtn = $('#start-timer');
    let stopBtn = $('#stop-timer');
    let seconds = 0;
    let interval = null;
    startBtn.on('click', startTimer);
    stopBtn.on('click', stopTimer);

    function startTimer() {
        if (interval === null) {
            interval = setInterval(createTime, 1000);
        }
    }

    function stopTimer() {
        clearInterval(interval);
        interval = null;
    }

    function createTime() {
        seconds++;
        hoursSpan.text(('0' + Math.floor(seconds / 60 / 60)).slice(-2));
        minutesSpan.text(('0' + Math.floor((seconds  / 60) % 60)).slice(-2));
        secondsSpan.text(('0' + seconds % 60).slice(-2));
    }
}