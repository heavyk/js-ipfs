/* eslint-env mocha */
'use strict'

const expect = require('chai').expect
const repoPath = require('./index').repoPath
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const spawn = require('justo-assert-cli').spawn
const describeOnlineAndOffline = require('../utils/on-and-off')

describe.only('files', () => {
  const env = _.clone(process.env)
  env.IPFS_PATH = repoPath

  describeOnlineAndOffline(repoPath, () => {
    it('cat', () => {
      expect(
        ipfs('files', 'cat', 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
      ).to.be.eql(
        'hello world\n'
      )
    })

    it('get', () => {
      expect(
        ipfs('files', 'get', 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
      ).to.be.eql(
        'Saving file(s) to QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o\n'
      )

      const file = path.join(process.cwd(), 'QmT78zSuBmuS4z925WZfrqQ1qHaJ56DQaTfyMUF7F8ff5o')
      expect(
        fs.readFileSync(file).toString()
      ).to.be.eql(
        'hello world\n'
      )

      fs.unlinkSync(file)
    })

    it('add', () => {
      expect(
        ipfs('files', 'add', 'src/init-files/init-docs/readme')
      ).to.be.eql(
        'added QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB readme\n'
      )
    })

    it('add recursively', () => {
      expect(
        ipfs('files', 'add', '-r', 'src/init-files/init-docs')
      ).to.be.eql([
        'added QmYE7xo6NxbHEVEHej1yzxijYaNY51BaeKxjXxn6Ssa6Bs init-docs/tour/0.0-intro',
        'added QmciSU8hfpAXKjvK5YLUSwApomGSWN5gFbP4EpDAEzu2Te init-docs/tour',
        'added QmTumTjvcYCAvRRwQ8sDRxh8ezmrcr88YFU7iYNroGGTBZ init-docs/security-notes',
        'added QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB init-docs/readme',
        'added QmdncfsVm2h5Kqq9hPmU7oAVX2zTSVP3L869tgTbPYnsha init-docs/quick-start',
        'added QmY5heUM5qgRubMDD1og9fhCPA6QdkMp3QCwd4s7gJsyE7 init-docs/help',
        'added QmQN88TEidd3RY2u3dpib49fERTDfKtDpvxnvczATNsfKT init-docs/docs/index',
        'added QmegvLXxpVKiZ4b57Xs1syfBVRd8CbucVHAp7KpLQdGieC init-docs/docs',
        'added QmYCvbfNbCwFR45HiNP45rwJgvatpiW38D961L5qAhUM5Y init-docs/contact',
        'added QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V init-docs/about',
        'added QmUhUuiTKkkK8J6JZ9zmj8iNHPuNfGYcszgRumzhHBxEEU init-docs',
        ''
      ].join('\n'))
    })
  })


  function ipfs () {
    const args = [`${process.cwd()}/src/cli/bin.js`].concat(Array.from(arguments))

    const res = spawn('node', args, {env})

    expect(res).to.have.property('stderr', '')
    expect(res).to.have.property('error', undefined)
    expect(res).to.have.property('exitCode', 0)

    return res.stdout
  }
})
