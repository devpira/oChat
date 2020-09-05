const { mongoDriver } = require('../../../mongodb')

const users = async (_) => {

    let returnResult = []

    await mongoDriver()
    .collection('users')
    .find()
    .forEach( userReturned => {
        console.log(userReturned)
        returnResult.push(userReturned)
    })
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    });
   
    return returnResult;
}

module.exports = users