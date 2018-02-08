const route = require('express').Router()
const shell = require('shelljs')
const fs = require('fs')
const uuid = require('uuid/v4')
let cExec = (req, res) => {
    let baseDIR = req.app.get('baseDIR')
    let fileName = uuid() + ".c"
    let inFilePath = baseDIR + "/codes/inputf.in"
    fs.writeFileSync(inFilePath, req.body.inputf)
    let filePathCode = baseDIR + "/codes/" + fileName
    fs.writeFile(filePathCode, Buffer.from(req.body.program, 'base64').toString(), (error) => {
        if(error) throw error
        shell.cd(baseDIR + "/codes/")
        shell.exec('gcc '+fileName, {silent: true}, (code, stdout, stderr) => {
            if(code === 0)
            {
                shell.exec('./a.out<inputf.in', {silent: true}, (code, stdout, stderr) => {
                    if(stdout === req.body.output)
                        res.send({
                            "result": "AC"
                        })
                    else
                    res.send({
                        "result": "WA"
                    })
                    shell.exec('rm a.out', {silent: true})
                })
            }
            else
            {
                res.send({
                    "result": "ERR",
                    "error": stderr
                })
            }
        })
    })
}
route.post('/', (req, res, next) => {
    if(req.body.lang === 'c')
        cExec(req, res)
})
module.exports = route