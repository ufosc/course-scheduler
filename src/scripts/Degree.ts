import {Course} from './Course'

/**
 * Defines a degree  
 */
export interface IDegree
{
	theName: string;
	theRequiredCredits: number;
	theRequiredCourses: Course[];
}

/**
 * A major or minor that contains all required courses and other requirements 
 */
export class Degree implements IDegree
{
	public theName: string;
	public theRequiredCredits: number;
	public theRequiredCourses: Course[];
	// TODO: Way to account for electives 

	/**
	 * Create degree from either
	 * @param aName Name of major 
	 * @param aRequiredCourses List of required courses
	 * @param aRequiredCredits Number of required credits
	 */
	constructor(aName: string, aRequiredCredits: number, aRequiredCourses: Course[])
	{
		// Add the attributes to the degree
		this.theName            = aName;
		this.theRequiredCourses = aRequiredCourses;
		this.theRequiredCredits = aRequiredCredits;
	}

	/**
	 * Make degree from from a parsed JSON
	 * @param aJson A json to create the degree from 
	 */
	static fromJson(aJson: IDegree): Degree
	{		
		// List for created objects, not json
		let reqCourseList: Course[] = [];

		// Loop through and create all the courses
		for (let courseItem of aJson.theRequiredCourses)
		{
			reqCourseList.push(Course.fromJson(courseItem));
		}

		// Call the constructor 
		return new Degree(aJson.theName, aJson.theRequiredCredits, reqCourseList);
	}

	/**
	 * Converts the Course to a Json 
	 */
	public toJson(): IDegree
	{
		// Create json from current attributes
		let json: IDegree =
			{
				"theName":            this.theName,
				"theRequiredCredits": this.theRequiredCredits,
				"theRequiredCourses": this.theRequiredCourses
			};
			
		return json;
	}

	/**
	 * Add a required course to the degree
	 * @param aNewReqCourse to add to the required course list
	 */
	public addPreReq(aNewReqCourse: Course | Course[]): void 
	{
		// Create course array
		let courseList: Course[] = [];

		// If it's a single item, make it an array 
		if (aNewReqCourse instanceof Course)
		{
			courseList[0] = aNewReqCourse;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			courseList = aNewReqCourse;
		}

		// Loop through the list and add them 
		for (let courseItem of courseList)
		{
			// Add the semester to overall list 
			this.theRequiredCourses.push(courseItem);
		}
	}

}