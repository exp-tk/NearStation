'use strict'

const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WS_ENDPOINT: '"wss://sapi.tinykitten.me/ws"',
  DIC_ENDPOINT: '"https://sapi.tinykitten.me/v1/dic.json"'
})
