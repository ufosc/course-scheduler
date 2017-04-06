# -*- coding: utf-8 -*-
import argparse
import json
import os
from progressbar import ProgressBar, Percentage, Bar, AdaptiveETA, Timer, Counter, FormatLabel
import requests
# Needed for using regular expressions.
import re
# Needed for referencing 'NoneType'.
from types import *

# Defines the address from which we fetch all the courses.
ONE_UF_API_ENDPOINT = 'https://one.uf.edu/apix/soc/schedule'


# Fetches courses from ONE.UF API endpoint, shows a handy progressbar if verbosity is true.
def fetch_courses(is_verbose=True):
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
        print('Fetching courses from one.uf.edu!')
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
        print('Recieved course data from one.uf.edu!')
    courses_nested_list = [r['COURSES'] for r in responses]
    return [course for sublist in courses_nested_list for course in sublist]

# Fetches the course prerequistes and appends them to a new field in the .json file.
def fetch_prereqs():
    
    # Creates a list to hold our scraped courses. 
    prelim_course_list = []
    course_list = []
    prelim_prereq_list = []
    prereq_list = []
    testlist = []

    # Performs a regular expression search on the database file.
    with open('db.json') as database_json: 
    	for line in database_json:
            if "code" in line:
    	        prelim_course_list.append(re.search(r'[A-Z]{3}[0-9]{4}[A-Z]*', line))

    # Throws away most data, which were unmatched lines defined by NoneType.
    for element in prelim_course_list:
       if element is not None:
       	 # Converts each element from a _sre.SRE_Match type to a string type.
       	 element = element.group()
         # print (element)
         course_list.append(element)
    
    # Queries the UF.ONE API for the relevant JSON page.
    course_index = 0;
    for element in course_list:
    	COURSE_PREREQ_QUERY = 'https://one.uf.edu/apix/soc/cdesc/' + element
    	print (course_index, ":", COURSE_PREREQ_QUERY)
    	r = requests.get(COURSE_PREREQ_QUERY)
    	prelim_prereq_list.append(r.json())
    	course_index += 1;

    with open("prereq_all.json", 'w+') as outfile:
        json.dump(prelim_prereq_list, outfile, indent = 4)
       
    # Append to the original db.json by adding the strings from prereq_string_list.
    n = 0;
    with open("prereq_all.json") as infile:
        for line in infile:
            if "CREDITS" in line:
                if "Prereq:" in line:
                    print("success");
                    print(n);
                    prereq_list.append(re.search(r'(?<=Prereq: ).*?(?=\")', line))
                    n += 1;
                else:
                    print("not found");
                    print(n);
                    prereq_list.append("null")
                    n += 1;
            if "[]," in line:
            	print("no data recieved");
            	print(n);
            	prereq_list.append("null")
            	n += 1;

    # Displays the prereq_course_list.
    with open('prereq_courses.json', 'w+') as outfile:
        json.dump(testlist, outfile, indent = 4)

def write_db(course_list, kind='json', path='.', separator=','):
    """
    Writes the JSON array to a database.
    """
    script_dir = os.path.dirname(__file__)
    
    # Name the output file is called changed temporarily for testing.
    out_path = os.path.join('db.' + script_dir + kind)
    with open(out_path, 'w+') as outfile:
        json.dump(course_list, outfile, indent=4)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(
            description='Fetches course data from https://one.uf.edu/!'
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

    # Path the db is written to has changed temporarily for testing.
    write_db(course_list, kind='json', path='../')

    # Call fetch_prereqs() to test it out. Overwhelms the console currently, be careful!
    fetch_prereqs()