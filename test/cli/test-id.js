/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const repoPath = require('./index').repoPath
const _ = require('lodash')
const describeOnlineAndOffline = require('../utils/on-and-off')

describe('id', () => {
  const env = _.clone(process.env)
  env.IPFS_PATH = repoPath
  const ipfs = require('../utils/ipfs')(env)

  describeOnlineAndOffline(repoPath, () => {
    it('get the id', () => {
      return ipfs('id').then((res) => {
        const id = JSON.parse(res)
        expect(id).to.have.property('id')
        expect(id).to.have.property('publicKey')
        expect(id).to.have.property('addresses')
      })
    })
  })
})
