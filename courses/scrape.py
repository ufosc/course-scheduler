# -*- coding: utf-8 -*-

import scrapy
import logging
import sys
import os

from courses.spiders import course_spider, prereq_spider
from scrapy.crawler import CrawlerRunner
from scrapy.settings import Settings
from scrapy.utils.log import configure_logging
from scrapy import signals
from twisted.internet import reactor, defer
from datetime import datetime
from pytz import timezone

@defer.inlineCallbacks
def crawl(runner):
    """
    Serially execute spiders
    """
    # TODO: Temporarily delete previous run logs in current run till I find a way
    # to supress logging of each item going through pipeline 
    if(os.path.exists('./courses.log')):
        os.remove('./courses.log')
    yield runner.crawl(course_spider.CourseSpider, outdir='./db/', term=term, category=category)
    # yield runner.crawl(prereq_spider.PrereqsSpider(file="db/courses_%s_%s.json" % (term, category)))
    reactor.stop()

if __name__ == '__main__':
    usage = """
    Usage:
    <this_script> [t:_term] [c:category]
    
    term        The school term for which the script should dump the course list
                (e.g. 20168, which is 2016 Fall(August)). Defaults to inferring
                from current datetime
                
    category    Search category for courses, defaults to RES
    """
    configure_logging(install_root_handler=False)
    logging.basicConfig(
        filename='courses.log',
        format='%(asctime)-15s [%(name)s] %(levelname)s: %(message)s',
        level=logging.INFO
    )
    
    term = None
    category = None
    
    if len(sys.argv) == 1:
        logging.log(
            logging.INFO, 
            'Found no arguments inferring arguments from current datetime'
        )
        # Default category for scraping
        category = 'RES'
        
        # Time.now is what we use to determine current semester in EST
        now = datetime.now(timezone('US/Eastern'))
        term = "%d%d" %(now.year, 1 if now.month < 8 else 8)
        logging.log(
            logging.DEBUG, 
            'Using: category=%s, term=%s' %(category, term)
        )
    elif len(sys.argv) == 2:
        arg = sys.argv[1]
        
        if arg[:2] == 't:':
            term = arg[2:]
        elif arg[:2] == 'c:':
            category = arg[2:]
        else:
            print(usage)    
    elif len(sys.argv) == 3:
        term = sys.argv[1][2:]
        category = sys.argv[2][2:]
    else:
        print(usage)
    
    runner = CrawlerRunner(Settings({
        'LOG_LEVEL': 'INFO',
        'LOG_STDOUT': False,
        'ITEM_PIPELINES': {'courses.pipelines.CoursesJsonWriterPipeline': 300},
        'CONCURRENT_REQUESTS': 32
    }))
    crawl(runner)
    reactor.run()