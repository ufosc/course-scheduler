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
    prelim_scraped_course_list = []
    scraped_course_list = []
    prelim_prereq_string_list = []
    prereq_string_list = []
    testlist = []
    finaltestlist = []
    final_prereq_string_list = []

    # Performs a regular expression search on the database file.
    with open('db.json') as database_json: 
    	for line in database_json:
    	    prelim_scraped_course_list.append(re.search(r'[A-Z]{3}[0-9]{4}[A-Z]*', line))

    # Throws away most data, which were unmatched lines defined by NoneType.
    for element in prelim_scraped_course_list:
       if element is not None:
       	 # Converts each element from a _sre.SRE_Match type to a string type.
       	 element = element.group()
         # print (element)
         scraped_course_list.append(element)

    # print('length: ')
    # print (len(scraped_course_list))

    # Defines what we want from the queried webpage.
    # desired_string = {'Prereq:': r'(?<=Prereq: ).*?(?=\")'}
    
    # Queries the UF.ONE API for the relevant JSON page.
    for element in scraped_course_list:
    	COURSE_PREREQ_QUERY = 'https://one.uf.edu/apix/soc/cdesc/' + element
    	print (COURSE_PREREQ_QUERY)
    	# Take a look at this. 
    	r = requests.get(COURSE_PREREQ_QUERY)
    	r.json()
    	prelim_prereq_string_list.append(r.json())
   
    # Prints the all COURSE_PREREQ_QUERY JSON data for all entire catalog.
    # print(prelim_prereq_string_list)

    # Need to determine the type of prelim_prereq_string_list. 
    print("type of prelim_prereq_string_list is: ", type(prelim_prereq_string_list), "type")

    # This is for testing purposes. Writes the data to a file.
    # test_dir = os.path.dirname(__file__)
    # out_path = os.path.join('prereq.' + test_dir + 'json')
    
    with open("prereq_all.json", 'w+') as outfile:
        json.dump(prelim_prereq_string_list, outfile, indent = 4)
       
    # Append to the original db.json by creating a new field in it, called prereqs, appended with the strings from prereq_string_list.
    n = 0;
    with open("prereq_all.json") as infile:
        for line in infile:
            if "CREDITS" in line:
                if "PREREQS" in line:
                    print("success");
                    print(n);
                    n = n + 1;
                else:
                    print("not found");
                    print(n);
                    n = n + 1;

    # Throws away most data, which were unmatched lines defined by NoneType.
    # for element in testlist:
        # if (element.contains("CREDITS")):
            # if element is not None:
                # Converts each element from a _sre.SRE_Match type to a string type.
           	    #element = element.group()
           	    # print (element)
           	    # finaltestlist.append(element)
            # else:
                # Appends a 'null' for that course's prerequisties, indiciating that it does not have any.
                # finaltestlist.append('null');

    # print(finaltestlist)

    # with open('final_prereqs.json', 'w+') as outfile:
        # json.dump(finaltestlist, outfile, indent = 4)
    
    """
    6b. Retrieve the prerequisties and append it to a newly created "prereqs" field in db.json. If there are no prerequisties, append 'NULL'.
    """

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