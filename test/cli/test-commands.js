/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const repoPath = require('./index').repoPath
const ipfs = require('../utils/ipfs')(repoPath)
const describeOnlineAndOffline = require('../utils/on-and-off')

describe('commands', () => {
  describeOnlineAndOffline(repoPath, () => {
    it('list the commands', () => {
      return ipfs('commands').then((out) => {
        expect(out.split('\n')).to.have.length(56)
      })
    })
  })
  it('list the commands even if not in the same dir', (done) => {
    nexpect.spawn('node', [process.cwd() + '/src/cli/bin.js', 'commands'], {cwd: '/tmp'})
      .run((err, stdout, exitcode) => {
        expect(err).to.not.exist
        expect(exitcode).to.equal(0)
        expect(stdout.length).to.equal(56)
        done()
      })
  })
})
