import json

from flask import *
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_url_path='/static')

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/api/v0.1/term/<int:term>', methods=['GET'])
def get_courses_for_term(term):
    # Get relevant course data
    # Can be pre-loaded outside to speed up later
    return jsonify(
        json.loads(
            open('courses/db/courses_{}_RES.json'.format(term), 'r').read()
        )
    )

@app.route('/api/v0.1/term/<int:term>/name/<string:name>', methods=['GET'])
@cross_origin()
def get_course_by_term_name(term, name):
    # Get relevant course data
    # Can be pre-loaded outside to speed up later
    courses = json.loads(
        open('courses/db/courses_{}_RES.json'.format(term), 'r').read()
    )
    results = []
    
    for course in courses:
        if course:
            if name.lower() in course['name'].lower():
                # TODO: Remove these two lines later
                course['theDifficultyRating'] = -1
                course['thePreReqs'] = []
                course['theProfessors'] = []
                course['theCredits'] = []
                course['theDescription'] = ""
                course['theID'] = course['code']
                course['theName'] = course['name']
                for section in course['sections']:
                    for instructor in section['instructors']:
                        course['theProfessors'].append(instructor['name'])
                    course['theCredits'].append(int(section['credits']))
                results.append(course)
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)