const fs = require('fs')
const { chain } = require('stream-chain')
const { parser } = require('stream-json')
const { streamArray } = require('stream-json/streamers/StreamArray')

async function loadJSON (filePath) {
  return new Promise((resolve, reject) => {
    const pipeline = chain([
      fs.createReadStream(filePath),
      parser(),
      streamArray()
    ])

    const result = []

    pipeline.on('data', ({ value }) => result.push(value))
    pipeline.on('end', () => resolve(result))
    pipeline.on('error', (err) => reject(err))
  })
}

module.exports = {
  loadJSON
}
