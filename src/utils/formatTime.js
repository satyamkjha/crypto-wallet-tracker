export const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
}

export const formatTime = (time) => {
    let date = formatDate(new Date(time))

    let hours = (new Date(time)).getHours()

    if (hours.toString().length == 1) {
        hours = '0' + hours.toString()
    }

    hours = hours.toString()

    let minutes = (new Date(time)).getMinutes()

    if (minutes.toString().length == 1) {
        minutes = '0' + minutes.toString()
    }

    minutes = minutes.toString()

    return date + ' ' + hours + ':' + minutes
}