'use strict'
const fs = require('fs')
const path = require('path')



try{
    if (process.argv.length != 5) throw "Parameters Missing"
    
    const db_file = process.argv[2]
    const column = process.argv[3]
    const searchParam = process.argv[4]
    
    //console.log(searchParam.match(RegExp(/[a-zA-Z]+/)))
    //check if path is a file or a dir, and checks if that file exists or not
    if (fs.existsSync(db_file)) {
        const stat = fs.statSync(db_file)
        if (stat.isDirectory) throw "Directory cannot be read"
    }else throw "File missing or path is wrong"
    
    
    //regular expression to recognize a date

    const date = new RegExp(/\b(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}\b/)
    //flag used over searchParam variable, true if matches a Name/Surname
    
    const flagName = searchParam.match(RegExp(/\b[a-zA-Z]+\b/))
    //flag used over searchParam variable, true if matches a Date
    const flafDate = searchParam.match(date)
    //flag to recognize if column param is an integer
    const flagColumn = column.match(RegExp(/\b[0-3]\b/)) 
    //flag used over searchParam variable, true if matches an integer
    const flagRow = searchParam.match(RegExp(/\b[1-9][0-9]*\b/)) || searchParam.match(RegExp(/\b0\b/))
    //generally checks to see if , considering an appropriate columns, the searchParam is coerente with that row
    if (!flagColumn || column <0 || column >3 ) throw "Error Parameters"
    if (column == 0 && (!flagRow || searchParam <0)) throw "Error Parameters"
    if ((column==1 || column == 2) && !flagName) throw "Error Parameters"
    if (column == 3 && !flafDate) throw "Error Parameters"
    
    const f1 = fs.readFileSync(db_file, "ascii")
    const f2 = f1.split("\r\n")
    //research of value searchParam
    f2.forEach(x => {if (x.split(",")[column].match(searchParam)) console.log(x)})
}
catch (e){
    console.error(e)
}

