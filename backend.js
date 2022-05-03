'use strict'
const fs = require('fs')


try{
    if (process.argv.length != 5) throw "Parameters Missing"
    
    const db_file = process.argv[2]
    const column = process.argv[3]
    const ntf = process.argv[4]
    //console.log(ntf.match(RegExp(/[a-zA-Z]+/)))
    if (!fs.existsSync(db_file) || !column.match(RegExp(/\b[0-9]+\b/)) || !ntf.match(RegExp(/\b[a-zA-Z]+\b/))) throw "Error Parameters"
    let file = []
    const f1 = fs.openSync(db_file, 0x111, 0x111)
    
    console.log(f1)    
}catch (e){
    console.error(e)
}

