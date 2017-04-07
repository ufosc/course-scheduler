import {Course} from './Course';
import {Difficulty} from './Difficulty';
import {SemesterMessages} from './Messages';

// Constants
const FULL_TIME_SUMMER_CREDITS = 9;
const FULL_TIME_SPRING_CREDITS = 12;
const FULL_TIME_FALL_CREDITS   = 12;

// Types of semesters 
export enum Season
{
	Spring,
	Summer, 
	Fall
}

/**
 * Defines a Semester
 */
export interface ISemester
{
	// From the courses 
	theCourses: Course[];
	theDifficultyRating: number;
	theCredits: number;

	// For this semester 
	theYear: number;
	theSeason: Season;
	theMessages: string[];
}

/**
 * Contains information about each semester and provides messages 
 */
export class Semester
{
	// From the courses 
	public theCourses: Course[];
	public theDifficultyRating: number;
	public theCredits: number;

	// For this semester 
	public theYear: number;
	public theSeason: Season;
	public theMessages: string[];

	/**
	 * Create a semester 
	 * @param aYear Number for the year
	 * @param aSeason Season for the semester
	 * @param aCourses List of courses in this semester, defaults to []
	 */
	constructor(aYear: number, aSeason: Season, aCourses: Course[] = [])
	{
		// Add the attributes to the semester, addCourse calls an update
		this.theCredits = 0;
		this.theYear    = aYear;
		this.theSeason  = aSeason;
		this.theCourses = [];
		this.addCourse(aCourses);
		// console.log("The Semester Constructor Credits " + this.theCredits);
	}

	/**
	 * Make semester object from a parsed JSON
	 * @param aJson A json to create the semester from 
	 */
	static fromJson(aJson: ISemester): Semester
	{
		// List for created objects, not json
		let courseList: Course[] = [];

		// Loop through and create all the courses
		for (let courseItem of aJson.theCourses)
		{
			courseList.push(Course.fromJson(courseItem));
		}

		// Call the constructor 
		// console.log("FromJson Semester");
		// console.log(new Semester(aJson.theYear, aJson.theSeason, courseList));
		
		return new Semester(aJson.theYear, aJson.theSeason, courseList);
	}

	/**
	 * Converts the Semester to a Json 
	 */
	public toJson(): ISemester
	{
		// Create json from current attributes
		let json: ISemester =
			{
				"theCourses":          this.theCourses,
				"theDifficultyRating": this.theDifficultyRating,
				"theCredits":          this.theCredits,
				"theYear":             this.theYear,
				"theSeason":           this.theSeason,
				"theMessages":         this.theMessages
			};
			
		return json;
	}

	/**
	 * Add a course to the semester, modifies semester credits, difficulty, and messages
	 * @param aNewCourse Course to add to the semester
	 */
	public addCourse(aNewCourse: Course | Course[]): void 
	{
		// Create course array
		let courseList: Course[] = [];

		// If it's a single item, make it an array 
		if (aNewCourse instanceof Course)
		{
			courseList[0] = aNewCourse;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			courseList = aNewCourse;
		}

		// Loop through the list and add them 
		for (let courseItem of courseList)
		{			
			// Add the semester to overall list 
			this.theCourses.push(courseItem);

			// Update credits
			this.theCredits += courseItem.theCredits;
		}
		// Update the attributes 
		this.updateSemester();
	}

	/**
	 * Removes a course from the semester, modifies semester credits, difficulty, and messages
	 * @param anOldCourse Course to be removed
	 */
	public removeCourse(anOldCourse: Course | Course[]): void 
	{
		// Create semester array
		let courseList: Course[] = [];

		// If it's a single item, make it an array 
		if (anOldCourse instanceof Course)
		{
			courseList[0] = anOldCourse;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			courseList = anOldCourse;
		}

		// Loop through the list and add them 
		for (let courseItem of courseList)
		{
			// Get location of the semester and remove it 
			let indexOfCourse: number = this.theCourses.indexOf(courseItem);
			if(indexOfCourse != -1) 
			{
				this.theCourses.splice(indexOfCourse, 1);

				// Update credits
				this.theCredits -= courseItem.theCredits;
			}
		}
		// Update the attributes 
		this.updateSemester();
	}

	/**
	 * Triggers the updates for all the data collected from the course content 
	 */
	private updateSemester(): void 
	{
		this.updateDifficulty();
		this.updateMessages();
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
		let sumOfDifficulty: number = 0;
		for (let course of this.theCourses)
		{
			sumOfDifficulty += course.theDifficultyRating;
		}

		// Average the courses 
		let averageDifficulty: number = sumOfDifficulty / this.theCourses.length;
		
		// Get the integer version of the average 
		this.theDifficultyRating = Number(averageDifficulty);
	}

	/**
	 * This updates the messages for this semester. Includes difficulty, insufficient credits 
	 */
	private updateMessages(): void 
	{
		// Get semester lists 
		let messages: SemesterMessages = new SemesterMessages();

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
		if (this.theDifficultyRating == Difficulty.Hard)
		{	
			this.theMessages.push(messages.Hard);
		}
		else if (this.theDifficultyRating == Difficulty.Insane)
		{
			this.theMessages.push(messages.Insane);
		}
	}

}