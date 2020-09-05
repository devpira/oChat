import grpc
import traceback
from pymongo.errors import DuplicateKeyError
from src.libs.exception.yummer_exception import YummerException
from src.libs.fluentd.my_logger import MyLogger


class ErrorHandlerInterceptor(grpc.ServerInterceptor):
    """
        A base gRPC interceptor class to handle exceptions thrown within the business logic of the gRPC endpoint.
        Methods
        --------
        intercept_service():
            This is a method that was overridden from the grpc.ServerInterceptor class. Its job is intercept the request
            and return a response.
        _handler_interceptor():
            Every gRPC request is handled by a gRPC handler. This method intercepts the handler and determines the type
            of handler that should be used for the response returned from the intercepted request
        _method_interceptor():
            When a request is made, it is calling a gRPC method defined in the servicer. This method's job is to
            intercept that method so that we can handle the execution of that method. This is where we do the exception
            handling.
    """

    def __init__(self, my_logger: MyLogger):
        self.my_logger = my_logger

    def intercept_service(self, continuation, handler_call_details):
        return self._handler_interceptor(continuation(handler_call_details), self._method_interceptor)

    def _handler_interceptor(self, handler, method_interceptor):
        if handler is None:
            return None

        # Determine the type of gRPC streaming to get the method and method handler:
        if handler.request_streaming and handler.response_streaming:
            method = handler.stream_stream
            method_handler = grpc.stream_stream_rpc_method_handler
        elif handler.request_streaming and not handler.response_streaming:
            method = handler.stream_unary
            method_handler = grpc.stream_unary_rpc_method_handler
        elif not handler.request_streaming and handler.response_streaming:
            method = handler.unary_stream
            method_handler = grpc.unary_stream_rpc_method_handler
        else:
            method = handler.unary_unary
            method_handler = grpc.unary_unary_rpc_method_handler

        return method_handler(method_interceptor(method),
                              request_deserializer=handler.request_deserializer,
                              response_serializer=handler.response_serializer)

    def _method_interceptor(self, method):
        def _new_method(request, context):
            try:
                # Execute the original request:
                return method(request, context)
            except YummerException as e:
                context.set_code(e.code)

                if e.trace_back is not None:
                    self.my_logger.error(f"Status Code: {e.code} - Track Back: {e.trace_back}", e)
                    context.set_details(e.message)
                else:
                    # If trace back is none then a custom exception was raised.
                    # Trace down where the custom exception was thrown:
                    trace_back = str(traceback.format_exc())
                    log_message = f"Status Code: {e.code} - Track Back: {trace_back}"

                    if e.message is not None:
                        log_message = log_message + f" - Error Message: {e.message}"
                        context.set_details(e.message)
                    else:
                        # Custom error wasn't provided, therefore sent to client the trace back error message:
                        detail_message = str(traceback.format_exc().splitlines()[-1])
                        context.set_details(detail_message)

                    self.my_logger.error(log_message, e)

            except DuplicateKeyError as e:
                # Get the trace back as it has more details than the exception thrown
                trace_back = str(traceback.format_exc())

                none_type = "%s: %s\n" % (type(None).__name__, str(None))
                if trace_back == none_type:
                    trace_back = str(e)

                self.my_logger.error(f"Internal server error thrown in "
                                     f"{self.__class__}._method_interceptor. Error Message: {trace_back}", e)
                context.set_code(grpc.StatusCode.ALREADY_EXISTS)
                context.set_details(f"Duplicate Key Error: {str(e)}")
            except Exception as e:
                # Get the trace back as it has more details than the exception thrown
                trace_back = str(traceback.format_exc())

                none_type = "%s: %s\n" % (type(None).__name__, str(None))
                if trace_back == none_type:
                    trace_back = str(e)

                self.my_logger.error(f"Internal server error thrown in "
                                     f"{self.__class__}._method_interceptor. Error Message: {trace_back}", e)
                context.set_code(grpc.StatusCode.INTERNAL)
                context.set_details(f"Internal Server Error: {str(e)}")

        return _new_method
