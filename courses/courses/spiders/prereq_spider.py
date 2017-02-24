# -*- coding: utf-8 -*-

import scrapy
import json
import pprint

class PrereqsSpider(scrapy.Spider):
    name = "prereqs"
    allowed_domains = ["one.uf.edu"]
    API_ENDPOINT_FMT = 'https://one.uf.edu/apix/soc/cdesc/%s'
    start_urls = []
    
    def __init__(self, filepath='./db/courses_20168_RES.json', *args, **kwargs):
        super(PrereqsSpider, self).__init__(*args, **kwargs)
        self.file = filepath
        with open(filepath, 'r') as file:
            courses = json.loads(file.read())
            for course in courses:
                self.start_urls.append(self.API_ENDPOINT_FMT % course['code'])
    
    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse)
            
    
    def parse(self, response):
        with open(self.file, 'rw') as f:
            courses = json.loads(f.read())
            code = (response.request.url).split('/')[-1]
            courses[code]
