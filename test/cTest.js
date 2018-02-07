const mocha = require('mocha')

const expect = require('chai').expect

const chai = require('chai')

const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)

const server = require('../server')

const testCodeAC = {
	"program": "I2luY2x1ZGUgPHN0ZGlvLmg+DQogDQp2b2lkIG1haW4oKQ0Kew0KCWludCBhOw0KCXNjYW5mKCIlZCIsICZhKTsNCiAgICAgICBwcmludGYoIiVkIiwgYSsxKTsNCn0=",
	"lang": "c",
	"inputf": "42",
	"output": "43"
}

const testCodeWA = {
	"program": "I2luY2x1ZGUgPHN0ZGlvLmg+DQogDQp2b2lkIG1haW4oKQ0Kew0KCWludCBhOw0KCXNjYW5mKCIlZCIsICZhKTsNCiAgICAgICBwcmludGYoIiVkIiwgYSsxKTsNCn0=",
	"lang": "c",
	"inputf": "42",
	"output": "43"
}

describe('Compilation Success', () => {
  it('Responds with AC', done => {
    chai.request(server)
      .post('/run')
      .send(testCodeAC)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})

describe('Compilation Success', () => {
  it('Responds with WA', done => {
    chai.request(server)
      .post('/run')
      .send(testCodeWA)
      .end((err, res) => {
        expect(res).to.have.status(200)
        done()
      })
  })
})