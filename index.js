// ---------------------------------------------- REQUIRES

const fs = require('fs')
const express = require('express')
const logger = require('log-to-file')
const uglify = require("uglify-es");

// ---------------------------------------------- VARS

const app = express()
const port = process.argv[2] || 8080
const api_map_path = process.argv[3] || './cdn_map.json'

function log() {
    let str = Array.from(arguments).join(' ')
    logger(str,__dirname+'/log.log')
    logger('[CDN] - '+str,'log.log')
    console.log(...arguments)
}

// ------------------------------------------------ FUNCTION

function get_code(path) {
    let cdn_map = JSON.parse(fs.readFileSync(api_map_path,'utf8'))
    if(!(path in cdn_map)) {
        return null
    }
    let script_data = cdn_map[path]
    let code = fs.readFileSync(script_data.path,'utf8')

    if(script_data.min) {
        log('minify script')
        code = uglify.minify(code).code
    }
    return code
}


// ------------------------------------------------ SERVER

app.get('/*',function(req, res) {
    let path = req.params[0]
    log('try to rich script',path)
    let code = get_code(path)
    if(code == null) {
        log('Yoops, no script')
        res.status(400)
        res.send('lib not found !')
        return
    }
    log('script given !')

    res.status(200)
    res.send(code)
})

// ------------------------------------------------ EXECUTE

app.listen(port, function () {
    log('start cdn a listening on',port)
})