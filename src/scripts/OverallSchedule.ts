import {Semester, Warning} from './Semester';
import {Course} from './Course'

/**
 * A major or minor with all the required courses 
 */
class Degree
{
	public theName: string;
	public theRequiredCourses: Course[];

	// May be unnecessary 
	public theRequiredCredits: number;

	constructor(aName: string, aRequiredCourses: Course[], aRequiredCredits: number = 0)
	{
		this.theName = aName;
		this.theRequiredCourses = aRequiredCourses;
		this.theRequiredCredits = aRequiredCredits;
		// Go through anc count the credits
		if (aRequiredCredits == 0)
		{
			for (let course of this.theRequiredCourses)
			this.theRequiredCredits += course.theCredits;
		}
	}

}

/**
 * The overall list of all semesters and their courses. Also has warnings. 
 */
class OverallSchedule
{
	// Semester related
	public theSemesters: Semester[];
	public theCredits: number;
	public theWarnings: Warning[];

	// Overall related
	public theMajors: Degree[];
	public theMinors: Degree[];

	constructor(aMajor: Degree[] = [], aMinor: Degree[] = [], aSemesters: Semester[] = [])
	{
		this.theMajors = aMajor;
		this.theMinors = aMinor;
		this.theSemesters = aSemesters;
		this.updateCredits();
		this.updateWarnings();
	}

	/**
	 * Get the credit hours from each of the semesters
	 */
	private updateCredits(): void
	{
		this.theCredits = 0;
		for (let semester of this.theSemesters)
		{
			this.theCredits += semester.theCredits;
		}
	}

	/**
	 * Find any issues from the overall schedule, including missing classes
	 */
	private updateWarnings(): void
	{
		this.theWarnings = [];
		for (let semester of this.theSemesters)
		{
			//this.theWarnings.push(semester.theWarnings)
		}
	}
}