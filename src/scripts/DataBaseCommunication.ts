import {Season} from "./Semester"
import {Course} from "./Course"

// Constants
// Course search ex: http://course-scheduler-dimsum.c9users.io/api/v0.1/term/20168/name/SYSTEMS
const COURSE_SEARCH_START: string = "http://course-scheduler-dimsum.c9users.io/api/v0.1/term/";
const COURSE_SEARCH_MODIFIER: string 	= "/name/";

/**
 * Contains all the data base communication functions and urls.
 */
export class DataBaseCommunication 
{	
	public static SearchCourse(className: string, year: string, semester: Season)
	{
		// Add season modifier to end of year. Fall is 8, Spring is 1
		switch (semester)
		{
			case Season.Fall:
				year = year.concat("8");
				break;
			case Season.Spring:
				year = year.concat("1");
				break;
			case Season.Summer:
				// TODO: Add summer term query 
				break;
			default:				
				// Do nothing
		}		

		// Create the query 
		let query: string = COURSE_SEARCH_START + "" + year + "" 
				+ COURSE_SEARCH_MODIFIER + "" + className.toUpperCase();

		let http: any = new XMLHttpRequest;

		// Set up asynchronous http request function
		http.onreadystatechange = function() 
		{ 			
			if (this.readyState == 4 && this.status == 200)
			{
				console.log("Got the JSON!");
				// Parse the getJSON
				let json = JSON.parse(this.responseText);
				let courseList: Course[] = [];

				for (let courseItem of json)
				{					
					courseList.push(Course.fromJson(courseItem));
				}
				/*console.log("Course list");
				console.log(courseList);
				return courseList;*/
			}
    }	

		// Send the request 
		// console.log(query);
		
    http.open("GET", query, true); 
    http.send(null);
		console.log("Response Text");
		console.log(http.responseText);
		
    // return http.responseText;
	}
}