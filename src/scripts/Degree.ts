import {Course} from './Course'

/**
 * A major or minor that contains all required courses and other requirements 
 */
export class Degree
{
	public theName: string;
	public theRequiredCourses: Course[];
	public theRequiredCredits: number;
	// TODO: Way to account for electives 

	/**
	 * Create degree from either a JSON or passed values. Only include first value for json.
	 * @param aJson If given as a JSON, just populate this, otherwise set to null
	 * @param aName Name of major 
	 * @param aRequiredCourses List of required courses
	 * @param aRequiredCredits Number of required credits, defaults to adding them up 
	 */
	constructor(aJson: string, aName?: string, aRequiredCourses?: Course[], aRequiredCredits?: number)
	{
		// Check if theres is enough arguments to not use json 
		if (aRequiredCourses == undefined)
		{
			this.makeDegreeFromJSON(aJson);
		}
		// It then must be a created from variables 
		else 
		{
			this.makeDegreeFromVariables(aName, aRequiredCourses, aRequiredCredits);
		}
	}

	/**
	 * Make degree from json 
	 * @param aJson A json
	 */
	private makeDegreeFromJSON(aJson: string): void
	{
		// Parse the JSON string 
		var json = JSON.parse(aJson);

		// Add the attributes to the degree
		this.theName            = json.aName;
		this.theRequiredCourses = json.aRequiredCourses;
		this.updateCredits(json.aRequiredCredits);
	}

	/**
	 * Make degree from values
	 * @param aName Name of major 
	 * @param aRequiredCourses List of required courses
	 * @param aRequiredCredits Number of required credits, defaults to adding them up
	 */
	private makeDegreeFromVariables(aName: string, aRequiredCourses: Course[], 
			aRequiredCredits: number = 0): void
	{
		this.theName            = aName;
		this.theRequiredCourses = aRequiredCourses;
		this.updateCredits(aRequiredCredits);
	}

	/**
	 * This updates the credits. If not supplied it is added from the course list 
	 * @param aRequiredCredits 
	 */
	private updateCredits(aRequiredCredits: number): void
	{
		// Go through and count the number of credits
		if (aRequiredCredits == 0)
		{
			for (let course of this.theRequiredCourses)
			{
				this.theRequiredCredits += course.theCredits;
			}
		}
		else
		{
			this.theRequiredCredits = aRequiredCredits;
		}
	}

}