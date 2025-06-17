# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter


class BookscraperPipeline:
    def process_item(self, item, spider):
        return item

import pymongo
from scrapy.exceptions import DropItem

class MongoDBPipeline:
    def __init__(self, mongo_uri, mongo_db, mongo_collection):
        self.mongo_uri = mongo_uri
        self.mongo_db = mongo_db
        self.mongo_collection = mongo_collection

    @classmethod
    def from_crawler(cls, crawler):
        # pull settings from settings.py
        return cls(
            mongo_uri=crawler.settings.get('MONGO_URI', 'mongodb://localhost:27017'),
            mongo_db=crawler.settings.get('MONGO_DATABASE', 'bookdb'),
            mongo_collection=crawler.settings.get('MONGO_COLLECTION', 'books')
        )

    def open_spider(self, spider):
        self.client = pymongo.MongoClient(self.mongo_uri)
        self.db = self.client[self.mongo_db]
        self.collection = self.db[self.mongo_collection]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        adapter = ItemAdapter(item)
        
        # Optional: Drop item if mandatory fields are missing
        if not adapter.get('title'):
            raise DropItem("Missing title in %s" % item)

        self.collection.insert_one(adapter.asdict())
        return item

""" 
    def process_item(self, item, spider):
        self.collection.insert_one(dict(item))  # convert item to dict if it's not already
        return item 
"""
    

