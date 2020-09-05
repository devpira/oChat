import pinject
from src.libs.grpc.grpc_server import GrpcServer
import sentry_sdk

from proto_lib.libs.python import user_pb2_grpc
from src.components.user.grpc.user_service import UserService

if __name__ == '__main__':
    sentry_sdk.init("https://1c609a9c8ee74d10a5b56bfe48f8e7ab@o425470.ingest.sentry.io/5361734")

    obj_graph = pinject.new_object_graph()
    grpc_server = GrpcServer()
    grpc_server.add_servicer(user_pb2_grpc.add_UserServicer_to_server, obj_graph.provide(UserService))
    grpc_server.start_server()
