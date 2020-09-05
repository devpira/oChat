const { mongoDriver } = require('../../../mongodb')

const createUser = async (_, args) => {

    let returnResult = {}
    await mongoDriver()
        .collection('users')
        .insertOne(args)
        .then(result => {
            console.log(result)
            returnResult = {
                _id: result.insertedId,
                ...args
            }
        })
        .catch(err => {
            console.log(err)
            returnResult = err
        });

    return returnResult;
}

module.exports = createUser
