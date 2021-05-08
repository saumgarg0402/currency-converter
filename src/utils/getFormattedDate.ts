
const getFormattedDayOrMonth = (value: number): string => {

    if(value >= 10) {
        return value.toString();
    } 

    return "0"+value;
}

const getFormattedDate = (date: Date): string => {

    const day:number = date.getDate();
    const month:number = date.getMonth() + 1;
    const year:number = date.getFullYear();


    return year + "-" + getFormattedDayOrMonth(month) + "-" + getFormattedDayOrMonth(day);
}

export default getFormattedDate;