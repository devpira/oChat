from client import grpc_client
from proto_lib.libs.python import user_pb2
from proto_lib.libs.python import user_pb2_grpc


stub = grpc_client('192.168.99.100')

# request = user_pb2.CreateUserRequest()
# request.uid = "Pira smells and useless"
# request.firstName = "Pira"
# request.lastName = "WORHTLESS"
# request.email = "pira@gmail.com"

# request = restaurant_pb2.GetRestaurantRequest()
# request._id = "5f2f8f4f909dd8591828dd42"
#
# response = stub.GetRestaurant(request)
# print(response.menuIds)

request = user_pb2.CreateUserRequest()
request.uid = "7LjpgzFzB8hWGGWZSFlNE0mtr3w2"
request.displayName = "Batman"
request.email = "batman@gmail.com"
request.imageUrl = "https://i.somethingawful.com/u/ctstalker/2013/batman.png"

response = stub.CreateUser(request)
print(response)

# request = menu_pb2.GetMenusRequest()
# request.menuIds.extend(['5f2f8ceb909dd8591828dd36', '5f2f8cd5909dd8591828dd33', '5f2f8ce3909dd8591828dd35', '5f2f8cdd909dd8591828dd34'])
#
# response = stub.GetMenus(request)
# print(response.menus)

# request = user_pb2.GetUserRequest()
# request.uid = "Pira smells and useless"
# response = stub.GetUser(request)
# print(response)


# request = admin__restaurant__pb2.updateRestaurantRequest()
# request.id = 1
# request.admin_uid = "2ZbPRJI6CxXiOrlZ4g0bvlYP5n82"
# request.name = "Pira restaurant"
# request.description = "This is a good restaurant"
# request.image_url = "www.imageurl.com"
# request.address = "720 Blimp Road"
# request.phone_number = "41627823923"
# request.email_address = "priarest@gmail.com"
# request.website = "pirarest.com"

#response = stub.createRestaurant(request)

#request = admin__restaurant__pb2.getAdminRestaurantRequest()
#request.admin_uid = "adminuid1"

# request = admin__menu__pb2.GetAllAdminMenusRequest()
# request.admin_uid = "cpfDMBMHa8hAArdZedO3NSadDF82"
# response = stub.GetAllAdminMenus(request)
# print(response.menus)

# from fluent import sender
# from fluent import event
#
# import time
#
# logger = sender.FluentSender("log_identifier", host="192.168.99.100", port=24224)
#
# log_message = {
#                 'log_name': '',  # placeholder for when we implement this
#                 'server': "pira",
#                 'level': "ERROR",
#                 'timestamp': time.strftime("%Y-%m-%d %H:%M:%S %z", time.gmtime()),
#                 'unique_id': '',  # placeholder for when we implement this
#                 'message': "error message",
#              }
# sender.setup('fluentd.test', host='192.168.99.100', port=24224)
# event.Event('follow', {
#   'from': 'userA',
#   'to':   'userB'
# })
# logger.emit("ERROR", log_message)
# print("log message sent")




