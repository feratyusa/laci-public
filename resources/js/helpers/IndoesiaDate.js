function changeToIndonesiaDateTime(timestamp=0, dateOnly=false){
    const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    if(dateOnly) return new Date(timestamp).toLocaleDateString('id', dateOptions)
    else return new Date(timestamp).toLocaleTimeString('id', dateOptions)
}

function changeToInputDate(timestamp=0){
    const date = new Date(timestamp)

    return(`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`)
}

export {changeToIndonesiaDateTime, changeToInputDate}