import {Course} from './Course';
import {Difficulty} from './Difficulty';
import {SemesterMessages} from './Messages';

// Constants
const FULL_TIME_SUMMER_CREDITS = 9;
const FULL_TIME_SPRING_CREDITS = 12;
const FULL_TIME_FALL_CREDITS   = 12;

// Types of semesters 
enum Season
{
	Spring,
	Summer, 
	Fall
}

/**
 * Contains information about each semester and provides messages 
 */
export class Semester
{
	// From the courses 
	public theCourses: Course[];
	public theRating: number;
	public theCredits: number;

	// For this semester 
	public theYear: number;
	public theSeason: Season;
	public theMessages: string[];

	/**
	 * Create a semester
	 * @param aYear: number for the year 
	 * @param aSeason: Season for the semester 
	 * @param aCourses: Course[] of courses in this semester 
	 */
	constructor(aYear: number, aSeason: Season, aCourses: Course[] = [])
	{
		this.theYear = aYear;
		this.theSeason = aSeason;
		this.addCourses(aCourses);
	}

	/**
	 * Add a single course to the semester, modifies semester credits, difficulty, and messages
	 */
	public addCourse(aNewCourse: Course): void 
	{
		// Add the course to course list 
		this.theCourses.push(aNewCourse);

		// Update semester attributes 
		this.theCredits += aNewCourse.theCredits;
		this.updateDifficulty();
		this.updateMessages();
	}

	/**
	 * Add a list of courses to the semester, modifies semester credits, difficulty, and messages, 
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this)
	 */
	public addCourses(aNewCourses: Course[]): void
	{
		// Loop through the list and add them to the course
		for (let newCourse of aNewCourses)
		{
			this.addCourse(newCourse);
		}
	}

	/**
	 * Removes a single course from the semester, modifies semester credits, difficulty, and messages
	 */
	public removeCourse(anOldCourse: Course): void 
	{
		// Get location of the course and remove it 
		var indexOfCourse = this.theCourses.indexOf(anOldCourse);
		if(indexOfCourse != -1) 
		{
			this.theCourses.splice(indexOfCourse, 1);
		}

		// Update the semester attributes 
		this.theCredits -= anOldCourse.theCredits;
		this.updateDifficulty();
		this.updateMessages();
	}

	/**
	 * Removes a courses list from the semester, modifies semester credits, difficulty, and messages
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this
	 */
	public removeCourses(anOldCourses: Course[]): void
	{
		// Loop through the list and remove them to the course
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
		// Check the difficulty of the semester by averaging them 
		// TODO: Rethink the algorithm 

		// Sum them all
		let sumOfDifficulty = 0;
		for (let course of this.theCourses)
		{
			sumOfDifficulty += course.theDifficultyRating;
		}

		// Average the courses 
		let averageDifficulty = sumOfDifficulty / this.theCourses.length;
		
		// Get the integer version of the average 
		this.theRating = Number(averageDifficulty);
	}

	/**
	 * This updates the messages for this semester including difficulty, insufficient credits 
	 */
	private updateMessages(): void 
	{
		// Get semester lists 
		let messages = new SemesterMessages();

		// Clear the messages
		this.theMessages = [];

		// Fulltime check, summer, spring, and fall
		if ((this.theSeason == Season.Summer && this.theCredits < FULL_TIME_SUMMER_CREDITS) ||
				(this.theSeason == Season.Spring && this.theCredits < FULL_TIME_SPRING_CREDITS) ||
				(this.theSeason == Season.Fall && this.theCredits < FULL_TIME_FALL_CREDITS))
		{
			// Add the fulltime message 
			this.theMessages.push(messages.FullTime);
		}

		// Check the difficulty
		if (this.theRating == Difficulty.Hard)
		{	
			this.theMessages.push(messages.Hard);
		}
		else if (this.theRating == Difficulty.Insane)
		{
			this.theMessages.push(messages.Insane);
		}
	}

}