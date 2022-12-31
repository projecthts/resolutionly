import * as fs from 'fs';

class Logger {
    public log(message: string, timeStamp: string, type: string = "INFO"){
        var date = new Date();
        var fullDate = date.getDate().toString() + "-" + date.getMonth().toString() + "-" + date.getFullYear().toString();
        var data = `${timeStamp}: [${type}] - ${message} \n`
        fs.appendFile("./src/logs/" + fullDate + ".log", data, function (err) {
            if (err) throw err;
        }); 
    }
}

let logger = new Logger();
export default logger;