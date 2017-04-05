/**
 * Defines a Course 
 */
export interface ICourse
{
	theName: string;
	theID: string;
	theCredits: number;
	theProfessors: string[];
	theDescription: string;
	thePreReqs: Course[];
	theDifficultyRating: number;
	// Should be called InterCourse
}

/**
 * Contains all information about a course 
 */
export class Course implements ICourse
{
	// From database
	public theName: string;
	public theID: string;
	public theCredits: number;
	public theProfessors: string[];
	public theDescription: string;
	public thePreReqs: Course[];
	public theDifficultyRating: number;
	// TODO: PostReqs?, Concurrent?, Completed?, notes?

	/**
	 * Creates a course 
	 * @param aName Class name
	 * @param anID Course number
	 * @param aCredits Number of credits for class
	 * @param aProfessors List of professors who have taught the class
	 * @param aDescription Course description 
	 * @param aPreReqs Prerequisites for this course, defaults to []
	 * @param aDifficultyRatings Difficulty based of course evaluations 
	 */
	constructor(aName: string, anID: string, aCredits: number, aProfessors: string[], 
			aDescription: string, aPreReqs: Course[], aDifficultyRatings: number)
	{
		// Add the attributes to the course
		this.theName             = aName;
		this.theID               = anID;
		this.theCredits          = aCredits;
		this.theProfessors       = aProfessors;
		this.theDescription      = aDescription;
		this.thePreReqs          = aPreReqs;
		this.theDifficultyRating = aDifficultyRatings;
	}

	/**
	 * Make course object from from a parsed JSON
	 * @param aJson A json to create the course from 
	 */
	static fromJson(aJson: ICourse): Course
	{
		// List for created objects, not json
		let preReqList: Course[] = [];		

		// Loop through and create all the courses
		for (let courseItem of aJson.thePreReqs)
		{			
			preReqList.push(Course.fromJson(courseItem));
		}		

		// Call the constructor 
		return new Course(aJson.theName, aJson.theID, aJson.theCredits, aJson.theProfessors, 
				aJson.theDescription, preReqList, aJson.theDifficultyRating);
	}

	/**
	 * Converts the Course to a Json 
	 */
	public toJson(): ICourse
	{
		// Create json from current attributes
		let json: ICourse = 
			{
				"theName":             this.theName,
				"theID":               this.theID,
				"theCredits":          this.theCredits,
				"theProfessors":       this.theProfessors,
				"theDescription":      this.theDescription,
				"thePreReqs":          this.thePreReqs,
				"theDifficultyRating": this.theDifficultyRating
			};

		return json;	
	}

	/**
	 * Add a prerequisites to the course
	 * @param aNewPreReq Course to add to the prerequisite list
	 */
	public addPreReq(aNewPreReq: Course | Course[]): void 
	{
		// Create course array
		let courseList: Course[] = [];

		// If it's a single item, make it an array 
		if (aNewPreReq instanceof Course)
		{
			courseList[0] = aNewPreReq;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			courseList = aNewPreReq;
		}

		// Loop through the list and add them 
		for (let courseItem of courseList)
		{
			// Add the semester to overall list 
			this.thePreReqs.push(courseItem);
		}
	}

}