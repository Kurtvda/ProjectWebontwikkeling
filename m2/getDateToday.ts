export function DateToday() : string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    if(month < 10){
        return `${day}/0${month}/${year}`;
    }
    else{
        return `${day}/${month}/${year}`;
    }
    
}
