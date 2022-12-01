export function getMinutes (time){
    const arrTime = time.split(':')
    const minute = arrTime[0] * 60 + parseInt(arrTime[1])
    return minute
}