import {Semester} from './Semester';
import {Difficulty} from './Difficulty';
import {OverallMessages} from './Messages';
import {Degree} from './Degree';

/**
 * Defines a Overall Schedule
 */
export interface IOverallSchedule
{
	// From the semesters 
	theSemesters: Semester[];
	theCredits: number;

	// For the overall
	theMajors: Degree[];
	theMinors: Degree[];
	theMessages: string[];
}

/**
 * The overall list of all semesters and their courses, and their messages
 * TODO: More messages
 */
export class OverallSchedule
{
	// From the semesters 
	public theSemesters: Semester[];
	public theCredits: number;

	// For the overall
	public theMajors: Degree[];
	public theMinors: Degree[];
	public theMessages: string[];

	/**
	 * Create an overall schedule for the given degrees 
	 * @param aMajor Degree[]
	 * @param aMinor Degree[], default to []
	 * @param aSemesters Semester[], default to [] 
	 */
	constructor(aMajor: Degree[], aMinor: Degree[] = [], aSemesters: Semester[] = [])
	{
		// Initialize values 
		this.theMajors    = [];
		this.theMinors    = [];
		this.theSemesters = [];
		this.theCredits   = 0;
		this.theMessages  = [];
		// Add the attributes to the overall schedule, each calls an update
		this.addMajor(aMajor);
		this.addMinor(aMinor);
		this.addSemester(aSemesters);
	}

	/**
	 * Make overall schedule object from a parsed JSON
	 * @param aJson A json to create the overall schedule from 
	 */
	static fromJson(aJson: IOverallSchedule): OverallSchedule
	{
		// List for created objects, not json
		let majorList: Degree[]      = [];
		let minorList: Degree[]      = [];
		let semesterList: Semester[] = [];
		
		// Loop through and create all the majors
		for (let majorItem of aJson.theMajors)
		{				
			majorList.push(Degree.fromJson(majorItem));
		}

		// Loop through and create all the minors
		for (let minorItem of aJson.theMinors)
		{			
			minorList.push(Degree.fromJson(minorItem));
		}

		// Loop through and create all the semesters
		for (let semesterItem of aJson.theSemesters)
		{
			// console.log("Push Semester Item");
			// console.log(Semester.fromJson(semesterItem));
			semesterList.push(Semester.fromJson(semesterItem));
		}

		// console.log("Schedule Constructor");
		// console.log(new OverallSchedule(majorList, minorList, semesterList));
		// Call the constructor 
		return new OverallSchedule(majorList, minorList, semesterList);
	}

	/**
	 * Converts the Overall Schedule to a Json 
	 */
	public toJson(): IOverallSchedule
	{
		// Create json from current attributes
		let json: IOverallSchedule =
			{
				"theSemesters": this.theSemesters,
				"theCredits":   this.theCredits,
				"theMajors":    this.theMajors,
				"theMinors":    this.theMinors,
				"theMessages":  this.theMessages
			};
			
		return json;
	}

	/**
	 * Add a semester to the overall schedule, modifies overall credits, difficulty, and 
	 * messages
	 * @param aNewSemester Semester or semester list to add to the overall schedule
	 */
	public addSemester(aNewSemester: Semester | Semester[]): void 
	{
		// Create semester array
		let semesterList: Semester[] = [];

		// If it's a single item, make it an array 
		if (aNewSemester instanceof Semester)
		{
			semesterList[0] = aNewSemester;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			semesterList = aNewSemester;
		}

		// Loop through the list and add them 
		for (let semesterItem of semesterList)
		{
			// Add the semester to overall list 
			this.theSemesters.push(semesterItem);
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}

	/**
	 * Removes a semester from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldSemester Semester or Semester list to be removed
	 */
	public removeSemester(anOldSemester: Semester | Semester[]): void 
	{
		// Create semester array
		let semesterList: Semester[] = [];

		// If it's a single item, make it an array 
		if (anOldSemester instanceof Semester)
		{
			semesterList[0] = anOldSemester;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			semesterList = anOldSemester;
		}

		// Loop through the list and add them 
		for (let semesterItem of semesterList)
		{
			// Get location of the semester and remove it 
			let indexOfSemester: number = this.theSemesters.indexOf(semesterItem);
			if(indexOfSemester != -1) 
			{
				this.theSemesters.splice(indexOfSemester, 1);
			}
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}


	/**
	 * Add a major to the overall schedule, modifies overall credits, difficulty, and messages
	 * @param aNewMajor Major or major list to add to the overall schedule
	 */
	public addMajor(aNewMajor: Degree | Degree[]): void 
	{
		// Create major array
		let majorList: Degree[] = [];

		// If it's a single item, make it an array 
		if (aNewMajor instanceof Degree)
		{
			majorList[0] = aNewMajor;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			majorList = aNewMajor;
		}

		// Loop through the list and add them 
		for (let majorItem of majorList)
		{
			// Add the major to overall list 
			this.theMajors.push(majorItem);
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}

	/**
	 * Removes a Major from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldMajor Major or Major list to be removed
	 */
	public removeMajor(anOldMajor: Degree | Degree[]): void 
	{
		// Create semester array
		let majorList: Degree[] = [];

		// If it's a single item, make it an array 
		if (anOldMajor instanceof Degree)
		{
			majorList[0] = anOldMajor;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			majorList = anOldMajor;
		}

		// Loop through the list and add them 
		for (let semesterItem of majorList)
		{
			// Get location of the semester and remove it 
			let indexOfMajor: number = this.theMajors.indexOf(semesterItem);
			if(indexOfMajor != -1) 
			{
				this.theMajors.splice(indexOfMajor, 1);
			}
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}

	/**
	 * Add a minor to the overall schedule, modifies overall credits, difficulty, and messages
	 * @param aNewMinor Minor or minor list to add to the overall schedule
	 */
	public addMinor(aNewMinor: Degree | Degree[]): void 
	{
		// Create minor array
		let minorList: Degree[] = [];

		// If it's a single item, make it an array 
		if (aNewMinor instanceof Degree)
		{
			minorList[0] = aNewMinor;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			minorList = aNewMinor;
		}

		// Loop through the list and add them 
		for (let minorItem of minorList)
		{
			// Add the minor to overall list 
			this.theMinors.push(minorItem);
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}

	/**
	 * Removes a Minor from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldMinor Minor or Minor list to be removed
	 */
	public removeMinor(anOldMinor: Degree | Degree[]): void 
	{
		// Create semester array
		let minorList: Degree[] = [];

		// If it's a single item, make it an array 
		if (anOldMinor instanceof Degree)
		{
			minorList[0] = anOldMinor;
		}
		// It's an array, so just set it equal to our new array
		else 
		{
			minorList = anOldMinor;
		}

		// Loop through the list and add them 
		for (let minorItem of minorList)
		{
			// Get location of the semester and remove it 
			let indexOfMinor: number = this.theMinors.indexOf(minorItem);
			if(indexOfMinor != -1) 
			{
				this.theMinors.splice(indexOfMinor, 1);
			}
		}
		// Update the attributes 
		this.updateOverallSchedule();
	}

	/**
	 * Triggers the updates for all the data collected from the semesters content 
	 */
	private updateOverallSchedule(): void
	{
		// Update overall schedule attributes 
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

}