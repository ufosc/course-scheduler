import {Semester} from './Semester';
import {Difficulty} from './Difficulty';
import {OverallMessages} from './Messages';
import {Degree} from './Degree';

/**
 * The overall list of all semesters and their courses, and their messages
 */
class OverallSchedule
{
	// From the semesters 
	public theSemesters: Semester[];
	public theCredits: number;

	// For the overall
	public theMajors: Degree[];
	public theMinors: Degree[];
	public theMessages: string[];

	/**
	 * Create the overall plan
	 * @param aMajor Degree[], default empty
	 * @param aMinor Degree[], default empty
	 * @param aSemesters Semester[], default empty 
	 */
	constructor(aMajor: Degree[] = [], aMinor: Degree[] = [], aSemesters: Semester[] = [])
	{
		this.theMajors = aMajor;
		this.theMinors = aMinor;
		this.theSemesters = aSemesters;
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Get the credit hours from each of the semesters
	 */
	private updateCredits(): void
	{
		// Reset number of credits
		this.theCredits = 0;

		// Sum up credits from each semester 
		for (let semester of this.theSemesters)
		{
			this.theCredits += semester.theCredits;
		}
	}

	/**
	 * Find any issues from the overall schedule, including missing classes, completed
	 */
	private updateMessages(): void
	{
		// Reset the messages 
		this.theMessages = [];
		
		// Do checks for message conditions 
	}

	// TODO: Change minor/major, more messages, to and from JSON
}