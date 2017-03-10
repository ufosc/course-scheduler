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
	 * Create degree 
	 * @param aName string 
	 * @param aRequiredCourses Course[]
	 * @param aRequiredCredits number, defaults to adding them up 
	 */
	constructor(aName: string, aRequiredCourses: Course[], aRequiredCredits: number = 0)
	{
		this.theName = aName;
		this.theRequiredCourses = aRequiredCourses;

		// Go through and count the number of credits
		if (aRequiredCredits == 0)
		{
			for (let course of this.theRequiredCourses)
			{
				this.theRequiredCredits += course.theCredits;
			}
		}
		
	}

}