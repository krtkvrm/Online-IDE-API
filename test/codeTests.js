const mocha = require('mocha')
const expect = require('chai').expect
const chai = require('chai')
const chaiHTTP = require('chai-http')
chai.use(chaiHTTP)
const server = require('../server')
describe('C Testing', () => {
  const testCodeAC = {
    "program": "I2luY2x1ZGUgPHN0ZGlvLmg+DQogDQp2b2lkIG1haW4oKQ0Kew0KCWludCBhOw0KCXNjYW5mKCIlZCIsICZhKTsNCiAgICAgICAgcHJpbnRmKCIlZCIsIGErMSk7DQp9",
    "lang": "c",
    "inputf": "42",
    "output": "43"
  }
  const testCodeWA = {
    "program": "I2luY2x1ZGUgPHN0ZGlvLmg+DQogDQp2b2lkIG1haW4oKQ0Kew0KCWludCBhOw0KCXNjYW5mKCIlZCIsICZhKTsNCiAgICAgICAgcHJpbnRmKCIlZCIsIGErMyk7DQp9",
    "lang": "c",
    "inputf": "42",
    "output": "43"
  }
  const testCodeERR = {
    "program": "I2luY2x1ZGUgPHN0ZGlvLmg+DQogDQp2b2lkIG1haW4oKQ0Kew0KCWludCBhOw0KCXNjYW5mKCIlZCIsICZhKTsNCiAgICAgICAgcHJpbmF0ZigiJWQiLCBhKzMpOw0KfQ==",
    "lang": "c",
    "inputf": "42",
    "output": "43"
  }
  it('Responds with AC', done => {
    chai.request(server)
      .post('/run')
      .send(testCodeAC)
      .end((err, res) => {
        expect(res.body).to.have.property('result').eq('AC')
        done()
      })
  })
  it('Responds with WA', done => {
    chai.request(server)
      .post('/run')
      .send(testCodeWA)
      .end((err, res) => {
        expect(res.body).to.have.property('result').eq('WA')
        done()
      })
  })
  it('Responds with ERR', done => {
    chai.request(server)
      .post('/run')
      .send(testCodeERR)
      .end((err, res) => {
        expect(res.body).to.have.property('result').eq('ERR')
        done()
      })
  })
})