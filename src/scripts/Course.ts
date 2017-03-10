/**
 * Contains all information about a course 
 */
export class Course
{
	// From UF
	public theName: string;
	public theID: string;
	public theDescription: string;
	public theCredits: number;
	public theProfessors: string[];
	public thePreReqs: Course[];
	public theDifficultyRating: number;
	// TODO: PostReqs?, Concurrent?, Completed?, notes?

	/**
	 * This will either parse a JSON with only one parameter, or all the values together.
	 * TODO: May not be the best methodology, but works for now.
	 */
	constructor(aName: string, anID: string = null, aDescription: string = null, 
			aCredits: number = null, aProfessors: string[] = null, aDifficultyRatings: number = null, 
			aNotes: string[] = null, aPreReqs: Course[] = null)
	{
		// Check if it's only one item. Which means it is given a JSON 
		if (anID == null)
		{
			this.makeCourseFromJSON(aName);
		}
		// It then must be a created from variables 
		else 
		{
			this.makeCourseFromVariables(aName, anID, aDescription, aCredits, aProfessors, 
					aDifficultyRatings, aNotes, aPreReqs);
		}
	}

	/**
	 * Make course object from JSON
	 */
	private makeCourseFromJSON(aJSON)
	{
		// Parse the JSON string 
		var json = JSON.parse(aJSON);

		// Add the attributes to the course 
		this.theName              = json.theName;
		this.theID                = json.theID;
		this.theDescription       = json.theDescription;
		this.theCredits           = json.theCredits;
		this.theProfessors        = json.theProfessors;
		this.theDifficultyRating = json.theDifficultyRatings;
		this.thePreReqs           = json.thePreReqs;
	}

	/**
	 * Makes course object from all the parameters 
	 */
	private makeCourseFromVariables(aName: string, anID: string, aDescription: string, 
			aCredits: number, aProfessors: string[], aDifficultyRatings: number, aNotes: string[], 
			aPreReqs: Course[])
	{
		this.theName              = aName;
		this.theID                = anID;
		this.theDescription       = aDescription;
		this.theCredits           = aCredits;
		this.theProfessors        = aProfessors;
		this.theDifficultyRating = aDifficultyRatings;
		this.thePreReqs           = aPreReqs;
	}

	// TODO: toJSON()
}