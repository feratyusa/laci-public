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

export default changeToIndonesiaDateTime