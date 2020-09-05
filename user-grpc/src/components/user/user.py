from src.libs.mongodb.mongodb_client import MongodbClient


class User:
    TABLE_NAME = "users"

    def __init__(self, mongodb_client: MongodbClient):
        self.mongo = mongodb_client

    def create_user(self, args: dict) -> str:
        result = self.mongo.collection(self.TABLE_NAME).insert_one(args)
        return str(result.inserted_id)

    def get_user(self, uid: str):
        return self.mongo.collection(self.TABLE_NAME).find_one({"uid": uid})
