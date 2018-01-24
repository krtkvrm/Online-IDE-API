const route = require('express').Router()

const shell = require('shelljs')

const fs = require('fs')

route.post('/', (req, res, next) => {

    let filePath = "/home/kartik/Programming/API_Programs/one.c"

    fs.writeFile(filePath, req.body.program, (error) => {
        if(error) throw error

        shell.cd('/home/kartik/Programming/API_Programs')

        shell.exec('gcc one.c', {silent: true}, (code, stdout, stderr) => {
            if(code === 0)
            {

                shell.exec('./a.out', {silent: true}, (code, stdout, stderr) => {


                    res.send(stdout)
                    shell.exec('rm a.out', {silent: true})
                })
            }
            else
            {
                res.send(stderr)
            }
        })
    })
})

module.exports = route