import {Course, Difficulty} from './Course';

// Constants
const FULLTIMESUMMER = 9;
const FULLTIMESPRING = 12;
const FULLTIMEFALL = 12;

enum Season
{
	Spring,
	Summer, 
	Fall
}

export enum Warning
{
	FullTime = "Not enough credits to be considered full time",
	Difficult = "This is a difficult semester",
	Insane = "This semester may be overwhelming" 
}

/**
 * Contains information about each semester and provides warnings 
 */
export class Semester
{
	// Course related 
	public theCourses: Course[];
	public theRating: Difficulty;
	public theCredits: number;

	// Semester related
	public theYear: number;
	public theSeason: Season;
	public theWarnings: Warning[];

	constructor(aYear: number, aSeason: Season, aCourses: Course[] = [])
	{
		this.theYear = aYear;
		this.theSeason = aSeason;
		this.addCourses(aCourses);
	}

	/**
	 * Add a course to the semester, modifies semester credits, difficulty, and warnings
	 */
	public addCourse(aNewCourse: Course): void 
	{
		this.theCourses.push(aNewCourse);
		this.theCredits += aNewCourse.theCredits;
		this.updateDifficulty();
		this.updateWarnings();
	}

	/**
	 * Add courses to the semester, modifies semester credits, difficulty, and warnings, TODO: Adjusts, technically n^2
	 */
	public addCourses(aNewCourses: Course[]): void
	{
		for (let newCourse of aNewCourses)
		{
			this.addCourse(newCourse);
		}
	}

	/**
	 * Removes a course from the semester, modifies semester credits, difficulty, and warnings
	 */
	public removeCourse(anOldCourse: Course): void 
	{
		// Remove from array 
		this.theCredits -= anOldCourse.theCredits;
		this.updateDifficulty();
		this.updateWarnings();
	}

	/**
	 * Removes courses from the semester, modifies semester credits, difficulty, and warnings
	 */
	public removeCourses(anOldCourses: Course[]): void
	{
		for (let oldCourse of anOldCourses)
		{
			this.addCourse(oldCourse);
		}
	}

	/**
	 * This updates the difficulty level of the semester by looking at the credits, course difficulty,
	 * and semester type
	 */
	private updateDifficulty(): void 
	{
		// Check the difficulty of the semester by averaging them TODO: Check the algorithm 
		let sumOfDifficulty = 0;
		for (let course of this.theCourses)
		{
			sumOfDifficulty += course.theDifficultyRating;
		}
		let averageDifficulty = sumOfDifficulty / this.theCourses.length;
		
		// Get the integer version of the average 
		this.theRating= Number(averageDifficulty);
	}

	/**
	 * This updates the warnings for this semester including difficulty, insufficient credits 
	 */
	private updateWarnings(): void 
	{
		// Clear the warnings
		this.theWarnings = [];

		// Fulltime check, summer, spring, and fall
		if ((this.theSeason == Season.Summer && this.theCredits < FULLTIMESUMMER) ||
				(this.theSeason == Season.Spring && this.theCredits < FULLTIMESPRING) ||
				(this.theSeason == Season.Fall && this.theCredits < FULLTIMEFALL))
		{
			// Add the fulltime warning 
			this.theWarnings.push(Warning.FullTime);
		}

		// Check the difficulty
		if (this.theRating == Difficulty.Difficult)
		{	
			this.theWarnings.push(Warning.Difficult);
		}
		else if (this.theRating == Difficulty.Insane)
		{
			this.theWarnings.push(Warning.Insane);
		}
	}

}