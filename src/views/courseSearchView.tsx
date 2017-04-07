import * as React from "react";
import CourseView from "./courseView"
import {Course, ICourse} from "../scripts/Course"
import {Season} from "../scripts/Semester"
import {DataBaseCommunication} from "../scripts/DataBaseCommunication"

// Database example: http://course-scheduler-dimsum.c9users.io/api/v0.1/term/20168/name/SYSTEM
const URL: string = "http://course-scheduler-dimsum.c9users.io/api/v0.1/term/20168/name/";

/**
 * Defines the state types for the course search 
 */
interface ICourseSearchState
{
	courses: Course[];
}

/**
 * This queries the database with a course name and displays all of them 
 */
class CourseSearchView extends React.Component<any, ICourseSearchState> 
{
	// For http request 
	private http: any;

	constructor(props: any) 
	{
    super(props);
		// Convert the passed data to a parsed JSON make it an OverallSchedule
		this.state = {courses: []};

		// Set up and query the database
		this.http = new XMLHttpRequest();
		this.searchCourse("System");
  }

	/**
	 * This sends an asynchronous http request
	 * @param url The url query 
	 * @param callback This function is called after the data is received. It's given a parsed json
	 */
	private httpGet(url: string, callback: any): void
	{
		// Set that to the class reference, anonymous functions override this
		let that = this;

		// Send asynchronous http request and update course list 
		this.http.onreadystatechange = function() 
		{ 			
			if (this.readyState == 4 && this.status == 200)
			{
				console.log("Got the JSON!");

				// Parse the json and update the class
				callback.bind(that)(JSON.parse(this.responseText));
			}
    }	
    this.http.open("GET", url, true); 
    this.http.send(null);
	}

	/**
	 * Updates the course list from the search and refreshes the page
	 * @param json A parsed json course list 
	 */
	private updateCourseList(json: ICourse[]): void
	{
		// Add the newly created courses to this
		let courseList: Course[] = [];

		// Create all the courses from the query 
		for (let courseItem of json)
		{					
			courseList.push(Course.fromJson(courseItem));
		}
		
		// Update the state to refresh the element 
		this.setState({courses: courseList});
	}

	/**
	 * This searches the course database with the given term 
	 * @param searchTerm Any part of the course name, must be at least three characters 
	 */
	private searchCourse(searchTerm: string): void
	{		
		// Don't update without sufficient data 
		if (searchTerm.length < 3)
		{
			return;
		}

		// Send the course http request and cause the state to update and refresh the element 
		this.httpGet(URL.concat(searchTerm.toUpperCase()), this.updateCourseList);
	}

  render() 
	{
		let courserList: Course[] = this.state.courses.map(function(tempCourse)
		{				
			return <CourseView aCourse={tempCourse}/>;
		});

		return(
			<div>
				<p>Query Results:</p>
				<ul>
					{courserList}
				</ul>
			</div>
		);

  }
}

export default CourseSearchView;