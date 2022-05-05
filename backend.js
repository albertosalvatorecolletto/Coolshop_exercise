'use strict'
const fs = require('fs')



try{
    if (process.argv.length != 5) throw "Parameters Missing"
    
    const db_file = process.argv[2]
    const column = process.argv[3]
    const ntf = process.argv[4]
    //console.log(ntf.match(RegExp(/[a-zA-Z]+/)))
    if (!fs.existsSync(db_file) || !column.match(RegExp(/\b[0-9]+\b/)) || !ntf.match(RegExp(/\b[a-zA-Z]+\b/))) throw "Error Parameters"
    const f1 = fs.readFileSync(db_file, {"encoding":"ascii"})
    const f2 = f1.split("\r\n")
    f2.forEach(x => {if (x.split(",")[column].match(ntf)) console.log(x)})
}catch (e){
    console.error(e)
}

