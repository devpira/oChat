import pymongo
import os


class MongodbClient:

    def __init__(self):
        user_name = os.environ.get("MONGODB_USER").strip()
        password = os.environ.get("MONGODB_PASSWORD").strip()
        host = os.environ.get("MONGODB_HOST").strip()
        # port = os.environ.get("MONGODB_PORT").strip()
        self.database = os.environ.get("MONGODB_DATABASE").strip()

        uri = "mongodb://" + user_name + ":" + password + "@" + host + "/?retryWrites=true&w=majority"
        self.client = pymongo.MongoClient(uri)

    def collection(self, collection_name: str):
        collection = self.client[self.database]
        return collection[collection_name]
