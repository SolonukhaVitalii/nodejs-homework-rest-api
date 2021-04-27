const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(path.resolve(__dirname, 'contacts', 'db.json'))
const db = low(adapter)

db.defaults({ contacts: [] }).write()

module.exports = db