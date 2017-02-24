import json
import logging

class CoursesJsonWriterPipeline(object):
    def open_spider(self, spider):
        self.file = open(spider.outfile, 'w')
        self.file.write("[\n//TODO: HACK ALERT! This file ends with an empty dictionary\n")

    def close_spider(self, spider):
        self.file.write("{}\n]")
        self.file.close()

    def process_item(self, item, spider):
        line = json.dumps(dict(item), indent=2) + ",\n"
        self.file.write(line)
        return item