import traceback
import grpc


class YummerException(Exception):
    """
    A custom exception used for AXP projects
    Properties
    ----------
    code : grpc.StatusCode
        A grpc.Status code from the gRPC library
    message : str
        A optional custom error message
    trace_back : str
        A string value of the exact error thrown
    stack_trace : str
        A string value of the stack trace for the error thrown
    """

    NONE_TYPE = "%s: %s\n" % (type(None).__name__, str(None))

    def __init__(self, code: grpc.StatusCode = grpc.StatusCode.INTERNAL, message: str = None):
        self._trace_back = str(traceback.format_exc())

        # traceback.format_exc() will always return a str and therefore 'None' type will always
        # be a string value of 'None'. Therefore check the string value:
        if self._trace_back == self.NONE_TYPE:
            self._trace_back = None

        self._stack_trace = str(traceback.format_stack())

        if self._stack_trace == self.NONE_TYPE:
            self._stack_trace = None

        self._code = code

        # If custom message not provided and trace back isn't empty then set the message to the actual error message:
        if message is None and self._trace_back is not None:
            message = str(traceback.format_exc().splitlines()[-1])

        self._message = message
        super().__init__(message)

    @property
    def code(self) -> grpc.StatusCode:
        return self._code

    @property
    def message(self) -> str:
        return self._message

    @property
    def trace_back(self) -> str:
        return self._trace_back

    @property
    def stack_trace(self) -> str:
        return self._stack_trace
