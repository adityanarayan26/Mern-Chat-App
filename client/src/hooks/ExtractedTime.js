

const ExtractedTime = (datestring) => {
    const date = new Date(datestring)
    const hours = padZero(date.getHours())
    const minutes = padZero(date.getMinutes())
    return `${hours} : ${minutes}`
}

export default ExtractedTime


function padZero(number) {
    return number.toString().padStart(2, "0");
}