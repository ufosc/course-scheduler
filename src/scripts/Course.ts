/**
 * Contains all information about a course 
 * TODO: toJSON()
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
	 * Creates a course from either a JSON or passed values. Only include first value for json.
	 * @param aJson If given as a json, just populate this parameter, otherwise set to null
	 * @param aName Class name
	 * @param anID Course number
	 * @param aDescription Course description 
	 * @param aCredits Number of credits for class
	 * @param aProfessors List of professors who have taught the class
	 * @param aDifficultyRatings Difficulty based of course evaluations 
	 * @param aPreReqs Prerequisites for this course, defaults to []
	 * TODO: May not be the best methodology, but works for now.
	 */
	constructor(aJson: string, aName?: string, anID?: string, aDescription?: string, 
			aCredits?: number, aProfessors?: string[], aDifficultyRatings?: number, aPreReqs?: Course[])
	{
		// Check if there are enough parameters to create the class
		if (aDifficultyRatings == undefined)
		{
			this.makeCourseFromJSON(aJson);
		}
		// It then must be a created from variables 
		else 
		{
			this.makeCourseFromVariables(aName, anID, aDescription, aCredits, aProfessors, 
					aDifficultyRatings, aPreReqs);
		}
	}

	/**
	 * Make course object from JSON
	 * @param aJson Json to create course from 
	 */
	private makeCourseFromJSON(aJson): void
	{
		// Parse the JSON string 
		var json = JSON.parse(aJson);

		// Add the attributes to the course 
		this.theName              = json.theName;
		this.theID                = json.theID;
		this.theDescription       = json.theDescription;
		this.theCredits           = json.theCredits;
		this.theProfessors        = json.theProfessors;
		this.theDifficultyRating  = json.theDifficultyRatings;
		this.thePreReqs           = json.thePreReqs;
	}

	/**
	 * Make course object from the parameters
	 * @param aName Class name 
	 * @param anID Course number
	 * @param aDescription Course description 
	 * @param aCredits Number of credits for class
	 * @param aProfessors List of professors who have taught the class
	 * @param aDifficultyRatings Difficulty based of course evaluations 
	 * @param aPreReqs Prerequisites for this course, defaults to []
	 */
	private makeCourseFromVariables(aName: string, anID: string, aDescription: string, 
			aCredits: number, aProfessors: string[], aDifficultyRatings: number, 
			aPreReqs: Course[] = []): void
	{
		this.theName              = aName;
		this.theID                = anID;
		this.theDescription       = aDescription;
		this.theCredits           = aCredits;
		this.theProfessors        = aProfessors;
		this.theDifficultyRating  = aDifficultyRatings;
		this.thePreReqs           = aPreReqs;
	}

}