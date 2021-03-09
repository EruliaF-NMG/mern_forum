/*
 * @Author: Chanaka Wickramasinghe
 * @Description: Date Time Helpers
 * @Date: 2020-02-18 09:52:25
 * @Last Modified by: Nisal Madusanka(EruliaF)
 * @Last Modified time: 2020-06-30 10:54:41
 */

/**
 * @description Convert date to given format
 * @param (number|string) date 
 * @param (string) format 
 */

const dateObjectToString = (date, format = "YY-mm-dd") => {
    const dateObject = new Date(date);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    switch (format) {
        case "YY-mm-dd":
            return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;
        case "YY/mm/dd":
            return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')}`;
        case "YY M dd":
            return `${dateObject.getFullYear()} ${months[dateObject.getMonth()]} ${dateObject.getDate().toString().padStart(2, '0')}`;
        // case "YY M day":
        //     return `${dateObject.getFullYear()} ${months[dateObject.getMonth()]} ${days[dateObject.getDate()]}`;
        case "dd-mm-YY":
            return `${dateObject.getDate().toString().padStart(2, '0')}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getFullYear()}`;
        case "dd/mm/YY":
            return `${dateObject.getDate().toString().padStart(2, '0')}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getFullYear()}`;
        case "dd M YY":
            return `${dateObject.getDate().toString().padStart(2, '0')} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
        // case "day M YY":
        //     return `${days[dateObject.getDate()]} ${months[dateObject.getMonth()]} ${dateObject.getFullYear()}`;
        case "YY-mm-dd HH:MM:II":
            return `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
        case "YY/mm/dd HH:MM:II":
            return `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
        case "YYmmddHHMMII":
            return `${dateObject.getFullYear()}${(dateObject.getMonth() + 1).toString().padStart(2, '0')}${dateObject.getDate().toString().padStart(2, '0')}${dateObject.getHours().toString().padStart(2, '0')}${dateObject.getMinutes().toString().padStart(2, '0')}${dateObject.getSeconds().toString().padStart(2, '0')}`;
        case "HH:MM:II":
                return `${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:00`;    
            
        default:
            return date;
    };
};

export {dateObjectToString};