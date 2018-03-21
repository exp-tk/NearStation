'use strict'

const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  WS_ENDPOINT: '"wss://sapi.tinykitten.me/ws"',
  DIC_ENDPOINT: '"https://sapi.tinykitten.me/v1/dic.json"'
})
