# this is just an example how you make grpc call, you can delete this
import grpc
import os

# import the generated classes
from proto_lib.libs.python import user_pb2_grpc


def grpc_client(hostname):
    ext_port = os.getenv('EXTERNAL_PORT', 8000)
    channel = grpc.insecure_channel("{0}:{1}".format(hostname, ext_port))

    stub = user_pb2_grpc.UserStub(channel)
    print("Accesed grc_client")
    return stub
