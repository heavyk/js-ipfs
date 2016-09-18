'use strict'

const execa = require('execa')
const expect = require('chai').expect

module.exports = (env) => function ipfs () {
  const args = Array.from(arguments)
  return execa(`${process.cwd()}/src/cli/bin.js`, args, {
    stipEof: true,
    env: env,
    timeout: 60 * 1000
  }).then((res) => {
    expect(res.stderr).to.be.eql('')

    return res.stdout
  })
}
