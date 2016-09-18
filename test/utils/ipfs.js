'use strict'

const execa = require('execa')
const expect = require('chai').expect
const _ = require('lodash')

module.exports = (repoPath) => {
  const env = _.clone(process.env)
  env.IPFS_PATH = repoPath

  const exec = (args) => execa(`${process.cwd()}/src/cli/bin.js`, args, {
    stipEof: true,
    env: env,
    timeout: 60 * 1000
  })

  function ipfs () {
    let args = Array.from(arguments)
    if (args.length === 1) {
      args = args[0].split(' ')
    }

    return exec(args).then((res) => {
      expect(res.stderr).to.be.eql('')

      return res.stdout
    })
  }

  ipfs.fail = function ipfsFail () {
    let args = Array.from(arguments)
    if (args.length === 1) {
      args = args[0].split(' ')
    }

    return exec(args).catch((err) => {
      expect(err).to.exist
    })
  }

  return ipfs
}
