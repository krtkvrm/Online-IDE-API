const route = require('express').Router()

const shell = require('shelljs')

const fs = require('fs')

route.get('/', (req, res, next) => {
    res.send("world")
})

let cExec = (req, res) => {

    let inFilePath = "/home/kartik/Programming/API_Programs/inputf.in"

    fs.writeFileSync(inFilePath, req.body.inputf)
    let filePathCode = "/home/kartik/Programming/API_Programs/one.c"

    fs.writeFile(filePathCode, Buffer.from(req.body.program, 'base64').toString(), (error) => {
        if(error) throw error

        shell.cd('/home/kartik/Programming/API_Programs')

        shell.exec('gcc one.c', {silent: true}, (code, stdout, stderr) => {
            if(code === 0)
            {

                shell.exec('./a.out<inputf.in', {silent: true}, (code, stdout, stderr) => {

                    if(stdout === req.body.output)
                        res.send("AC")
                    else
                        res.send("WA")
                    shell.exec('rm a.out', {silent: true})
                })
            }
            else
            {
                res.send(stderr)
            }
        })
    })
}

route.post('/', (req, res, next) => {
    if(req.body.lang === 'c')
        cExec(req, res)

})

module.exports = route