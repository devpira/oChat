const userName = "root"
const password = "rootpassword"
const host = "192.168.99.100"

const uri = "mongodb://" + userName + ":" + password + "@" + host + "?retryWrites=true&w=majority"
const database = "oChat"

module.exports = {
    uri: uri,
    database: database
}
