import uuid
import time
import os
from fluent import sender
from sentry_sdk import capture_exception


class MyLogger:
    FATAL = "FATAL"
    ERROR = "ERROR"
    WARN = "WARN"
    INFO = "INFO"
    DEBUG = "DEBUG"
    TRACE = "TRACE"

    def __init__(self):
        host = os.environ.get("FLUENTD_HOST").strip()
        port = os.environ.get("FLUENTD_PORT").strip()
        self.identifier = os.environ.get("FLUENTD_IDENTIFIER").strip()
        self.logger = sender.FluentSender("GRPC Python", host=host, port=int(port))

    def debug(self, message: str):
        self._log_message(message, self.DEBUG)

    def info(self, message: str):
        self._log_message(message, self.INFO)

    def warning(self, message: str):
        self._log_message(message, self.WARN)

    def error(self, message: str, e: Exception = None):
        self._log_message(message, self.ERROR)
        if e:
            capture_exception(e)

    def _log_message(self, message: str, level: str):
        log_message = {
            'log_name': 'Fluentd',  # placeholder for when we implement this
            'server': self.identifier,
            'level': level,
            'timestamp': time.strftime("%Y-%m-%d %H:%M:%S %z", time.gmtime()),
            'unique_id': '',  # placeholder for when we implement this
            'message': message,
        }

        self.logger.emit(level, log_message)
