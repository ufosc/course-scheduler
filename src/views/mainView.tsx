// Display the main page 
import * as React from "react";
import OverallScheduleView from "./overallScheduleView";
import {OverallSchedule} from "../scripts/OverallSchedule"
import CourseSearchView from "./courseSearchView"

// Some data for testing 
var dummyData = JSON.stringify(
  {
      "theSemesters": 
      [
        {
          "theYear": 2017,
          "theSeason": "Fall",
          "theCourses": 
          [
            {
              "theName": "General Chemistry 1",
              "theID": "CHM 2045",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "General Chemistry 1 Laboratory",
              "theID": "CHM 2045L",
              "theDescription": "",
              "theCredits": 1,
              "theProfessors": [""], 
              "theDifficultyRating": 2,
              "thePreReqs": []
            },
            {
              "theName": "Programming Fundamentals 1",
              "theID": "COP 3502",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "Expository and Argumentative Writing",
              "theID": "ENC 1101",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 2,
              "thePreReqs": []
            },
            {
              "theName": "What is the Good Life",
              "theID": "IUF 1000",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 2,
              "thePreReqs": []
            },
            {
              "theName": "Analytic Geometry and Calculus 1",
              "theID": "MAC 2311",
              "theDescription": "",
              "theCredits": 4,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            }
          ]
        },
        {
          "theYear": 2018,
          "theSeason": "Spring",
          "theCourses": 
          [
            {
              "theName": "Programming Fundamentals 2",
              "theID": "COP 3503",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "Applications of Discrete Structures",
              "theID": "COT 3100",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            },
            {
              "theName": "Analytic Geometry and Calculus 2",
              "theID": "MAC 2312",
              "theDescription": "",
              "theCredits": 4,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "Physics with Calculus 1",
              "theID": "PHY 2048",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            },
            {
              "theName": "Physics with Calculus 1 Laboratory",
              "theID": "PHY 2048L",
              "theDescription": "",
              "theCredits": 1,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            }
          ]
        },
        {
          "theYear": 2018,
          "theSeason": "Fall",
          "theCourses": 
          [
            {
              "theName": "Data Structures and Algorithm",
              "theID": "COP 3530",
              "theDescription": "",
              "theCredits": 4,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            },
            {
              "theName": "Analytic Geometry and Calculus 3",
              "theID": "MAC 2313",
              "theDescription": "",
              "theCredits": 4,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            },
            {
              "theName": "Physics with Calculus 2",
              "theID": "PHY 2049",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            },
            {
              "theName": "Laboratory for Physics with Calculus 2",
              "theID": "PHY 2049L",
              "theDescription": "",
              "theCredits": 1,
              "theProfessors": [""], 
              "theDifficultyRating": 2,
              "thePreReqs": []
            }
          ]
        },
        {
          "theYear": 2019,
          "theSeason": "Spring",
          "theCourses": 
          [
            {
              "theName": "Introduction to Software Engineering",
              "theID": "CEN 3031",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "Professional Communication for Engineers",
              "theID": "ENC 3246",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 1,
              "thePreReqs": []
            },
            {
              "theName": "Computational Linear Algebra",
              "theID": "MAS 3114",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 3,
              "thePreReqs": []
            },
            {
              "theName": "Introduction to Computer Organization",
              "theID": "CDA 3101",
              "theDescription": "",
              "theCredits": 3,
              "theProfessors": [""], 
              "theDifficultyRating": 4,
              "thePreReqs": []
            }
          ]
        }
      ],
      "theMajors": 
      [{
        "theName": "Computer Science",
        "theRequiredCourses": [],
        "theRequiredCredits": 0
      }],
      "theMinors": 
      [{
        "theName": "",
        "theRequiredCourses": [],
        "theRequiredCredits": 0
      }],
  }
);

/**
 * This is the main layout of the page 
 */
class MainView extends React.Component<any, any> 
{

  render() 
	{
		return(
      <div>
			  <OverallScheduleView class="right" aSchedule={OverallSchedule.fromJson(JSON.parse(dummyData))}/>
        <CourseSearchView/>
      </div>
		);

  }
}

export default MainView;