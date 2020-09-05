import grpc
from concurrent import futures
import os

from src.libs.grpc.interceptors.error_handling_interceptor import ErrorHandlerInterceptor
from src.libs.fluentd.my_logger import MyLogger


class GrpcServer:

    def __init__(self):
        max_workers = os.getenv('MAX_WORKERS', 10)
        self.app_port = os.getenv('APP_PORT', 8000)

        self.server = grpc.server(futures.ThreadPoolExecutor(max_workers),
                                  interceptors=[ErrorHandlerInterceptor(MyLogger())])

    def add_servicer(self, servicer_function, service_class):
        servicer_function(service_class, self.server)

    def start_server(self):
        print("Starting server. Listening on port {0}.".format(self.app_port))
        self.server.add_insecure_port("[::]:{0}".format(self.app_port))
        self.server.start()
        self.server.wait_for_termination()
