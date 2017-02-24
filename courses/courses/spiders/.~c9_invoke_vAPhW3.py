# -*- coding: utf-8 -*-

import scrapy
import json
import logging
from urllib.parse import urlsplit, urlunsplit, urlencode, parse_qsl
from courses.items import ArbitraryItem

import os

class CourseSpider(scrapy.Spider):
    """
    Usage:
    scrapy crawl courses -a outdir=./db/ -a category=RES -a term=20168
    
    The -a passes a cmdline argument to the spider telling it the output 
    directory where the json dump is to be stored. None of the arguments are
    mandatory and the example given describes the defaults
    """
    name = "courses"

    def __init__(self, outdir='./db/', term='20168', category='RES'):
        super().__init__()
        self.outdir = outdir
        self.category = category
        self.term = term
        self.start_urls = [
            'https://one.uf.edu/apix/soc/schedule/?term=%s&category=%s&lastrow=0' % (str(self.term), str(self.category))
        ]
        self.outfile = os.path.abspath(os.path.join(self.outdir, 'courses_%s_%s.json' % (self.term, self.category)))
        if(os.path.exists(self.outfile)):
            os.remove(self.outfile)

    def start_requests(self):
        for url in self.start_urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        yield scrapy.Request(url=self.next_url(response), callback=self.parse)
        json_resp = json.loads(response.body_as_unicode())[0]['COURSES']
        for item in json_resp:
            yield ArbitraryItem(item)

    def next_url(self, response):
        json_resp = json.loads(response.body_as_unicode())[-1]
        s, n, p, query_string, f = urlsplit(response.request.url)
        query_params = parse_qsl(query_string)
        next_row = current_row = int(query_params[2][1])
        total_rows = json_resp['TOTALROWS']
        if next_row < total_rows:
            next_row = current_row + json_resp['LASTROW']
        query_params[2] = ('lastrow', next_row)
        query_string = urlencode(query_params)
        return urlunsplit((s, n, p, query_string, f))
        
