# -*- coding: utf-8 -*-
import argparse
import json
import os
from progressbar import ProgressBar, Percentage, Bar, AdaptiveETA, Timer, Counter, FormatLabel
import requests

import pprint

ONE_UF_API_ENDPOINT = 'https://one.uf.edu/apix/soc/schedule'

def fetch_courses(is_verbose=True):
    """
    Fetches courses from ONE.UF API endpoint, shows a handy progressbar if 
    verbosity is set to true
    """
    payload = {'category': 'RES', 'term': '20168', 'last-row':'0'}
    responses = list()
    total_rows = 0
    next_row = 0
    bar = ProgressBar(
            widgets=[
                FormatLabel('Rows: %(value)d/%(max_value)d '),
                Percentage(), 
                Bar(marker=u'■', left='[', right=']'), 
                ' ',
                Timer(), 
                ' ', 
                AdaptiveETA()
            ]
        )
    
    if is_verbose:
        print('Fetching courses from one.uf.edu')
        bar.max_value = total_rows
        bar.update(0)

    while True:
        bar.max_value = total_rows
        if is_verbose:
            bar.update(next_row)
        payload['last-row'] = str(next_row)
        r = requests.get(ONE_UF_API_ENDPOINT, params=payload)
        responses.append(r.json()[0])
        total_rows = responses[-1]['TOTALROWS']
        next_row = responses[-1]['LASTROW']
        if (next_row is None) or (next_row > total_rows):            
            print('')
            break
    
    if is_verbose:
        print('Recieved course data from one.uf.edu')
    courses_nested_list = [r['COURSES'] for r in responses]
    return [course for sublist in courses_nested_list for course in sublist]

def write_db(course_list, kind='json', path='.', separator=','):
    """
    Writes the JSON array to a database using pandas as the middleware
    """
    script_dir = os.path.dirname(__file__)
    out_path = os.path.join(script_dir, path + '/db.' + kind)
    with open(out_path, 'w+') as outfile:
        json.dump(course_list, outfile, indent=4)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
            description='Fetches course data from https://one.uf.edu/'
    )
    parser.add_argument(
        '-q', dest='quiet', 
        help='Disable all output', 
        action='store_true'
    )
    
    parser.set_defaults(quiet=False)
    
    opts = parser.parse_args()
    is_verbose = not opts.quiet
    course_list = fetch_courses(is_verbose)
    # write_db(course_list, kind='csv', path='../db')
    write_db(course_list, kind='json', path='../db')