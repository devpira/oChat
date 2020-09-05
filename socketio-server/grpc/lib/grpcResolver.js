const executeGrpcFunction = require('./executeGrpcFunction')
const grpcErrorInterceptor = require('./grpcErrorInterceptor')


const grpcResolver = async ({
    requestParams,
    authentication,
    grpcClient,
    grpcFunction,
    onSuccess,
    onEmptyResponse
}) => {
    if (authentication) {
        const { uid } = authentication
        if (!uid) {
            throw new Error('must authenticate');
        }
    }

    let returnResult = {}

    await executeGrpcFunction(grpcClient, grpcFunction, requestParams)
        .then(
            result => {
                if (result) {
                    returnResult = onSuccess(result)
                } else {
                    if (onEmptyResponse) {
                        returnResult = onEmptyResponse()
                    } else {
                        console.log("Grpc request was successful, but the response returned as empty.")
                        throw new Error(
                            "Request was successful, but the response returned as empty.", "INTERNAL",
                            { type: "ERROR", serverMessage: "500 Internal Server Error" }
                        );
                    }
                }
            }
        ).catch(
            error => {
                console.log("executeGrpcFunction error: ", error)
                console.log("grpcErrorInterceptor handling error.")
                //Intercept the grpc error:
                grpcError = grpcErrorInterceptor(error, grpcFunction)
                if (grpcError) {
                    throw grpcError
                }
                console.log("Error did not fall within grpcErrorInterceptor domain as error code was not a grpc error code. Passing error over.")
                returnResult = error
            }
        )

    return returnResult
}


module.exports = grpcResolver
