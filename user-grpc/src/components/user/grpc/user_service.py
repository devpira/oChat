# import the generated classes
from proto_lib.libs.python import user_pb2
from proto_lib.libs.python import user_pb2_grpc

# import the business logic
from src.components.user.user import User

from src.libs.grpc.helpers.protobuf.protobuf_to_dict import dict_to_protobuf, protobuf_to_dict


class UserService(user_pb2_grpc.UserServicer):

    def __init__(self, user: User):
        self.user = user

    def CreateUser(self, request, context):
        response = user_pb2.CreateUserResponse()
        response.insertedId = self.user.create_user(protobuf_to_dict(request))
        return response

    def GetUser(self, request, context):
        result = self.user.get_user(request.uid)
        if result is None:
            return user_pb2.GetUserResponse()
        return dict_to_protobuf(user_pb2.GetUserResponse(), result)

