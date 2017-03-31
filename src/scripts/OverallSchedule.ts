import {Semester} from './Semester';
import {Difficulty} from './Difficulty';
import {OverallMessages} from './Messages';
import {Degree} from './Degree';

/**
 * The overall list of all semesters and their courses, and their messages
 * TODO: More messages, to JSON
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
	 * Create a overall schedule from either a JSON or passed values. Only include first value for 
	 * json.
	 * @param aJson If given as a JSON, just populate this, otherwise set to null
	 * @param aMajor Degree[]
	 * @param aMinor Degree[], default to []
	 * @param aSemesters Semester[], default to [] 
	 * TODO: May not be the best methodology, but works for now.
	 */
	constructor(aJson: string, aMajor?: Degree[], aMinor?: Degree[], aSemesters?: Semester[])
	{
		// Check if theres is enough arguments to not use json 
		if (aMajor == undefined)
		{
			this.makeOverallScheduleFromJSON(aJson);
		}
		// It then must be a created from variables 
		else 
		{
			this.makeOverallScheduleFromVariables(aMajor, aMinor, aSemesters);
		}
	}

	/**
	 * Make overall schedule object from JSON
	 * @param aJson A json to create the course from 
	 */
	private makeOverallScheduleFromJSON(aJson: string): void
	{
		// Parse the JSON string 
		var json = JSON.parse(aJson);

		// Add the attributes to the overall schedule 
		this.theMajors    = json.aMajor;
		this.theMinors    = json.aMinor;
		this.theSemesters = json.aSemesters;
		let temp = json.
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Makes semester object from all the parameters 
	 * @param aMajor List of majors
	 * @param aMinor List of minors, defaults to []
	 * @param aSemesters List of semesters, defaults to []
	 */
	private makeOverallScheduleFromVariables(aMajor: Degree[], aMinor: Degree[] = [], 
			aSemesters: Semester[] = []): void
	{
		this.theMajors    = aMajor;
		this.theMinors    = aMinor;
		this.theSemesters = aSemesters;
		this.updateCredits();
		this.updateMessages();
	}


	private updateOverallSchedule(): void
	{
		// Update overall schedule attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Add a semester to the overall schedule, modifies overall credits, difficulty, and 
	 * messages
	 * @param aNewSemester Semester or semester list to add to the overall schedule
	 */
	public addSemester(aNewSemester: Semester | Semester[]): void 
	{
		// Create semester array
		let semesterList = [];

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
		for (let semesterJson of semesterList)
		{
			// Create the semester 
			let tempSemester: Semester = new Semester(semesterJson);

			// Add the semester to overall list 
			this.theSemesters.push(tempSemester);
		}

		this.updateOverallSchedule();
	}

	/**
	 * Add a list of semesters to the overall schedule, modifies overall credits, difficulty, and 
	 * messages. Uses addSemester. 
	 * @param aNewSemesters List of semesters to add to the overall schedule
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this)
	 */
	public addSemesters(aNewSemesters: Semester[]): void
	{
		// Loop through the list and add them 
		for (let newSemester of aNewSemesters)
		{
			this.addSemester(newSemester);
		}
	}

	/**
	 * Removes a single semester from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldSemester Semester to be removed
	 */
	public removeSemester(anOldSemester: Semester): void 
	{
		// Get location of the semester and remove it 
		var indexOfSemester = this.theSemesters.indexOf(anOldSemester);
		if(indexOfSemester != -1) 
		{
			this.theSemesters.splice(indexOfSemester, 1);
		}

		// Update the overall attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Removes a semester list from the overall schedule, modifies overall credits, difficulty, and 
	 * messages. Uses removeSemester. 
	 * @param anOldSemesters: Semester list to be removed
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this
	 */
	public removeSemesters(anOldSemesters: Semester[]): void
	{
		// Loop through the list and remove them
		for (let oldSemester of anOldSemesters)
		{
			this.addSemester(oldSemester);
		}
	}

	/**
	 * Add a single major to the overall schedule, modifies overall credits, difficulty, and messages
	 * @param aNewMajor Major to add to the overall schedule
	 */
	public addMajor(aNewMajor: Degree): void 
	{
		// Add the major to overall list 
		this.theMajors.push(aNewMajor);

		// Update overall attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Add a list of courses to the overall schedule, modifies overall credits, difficulty, and 
	 * messages. Uses addMajor. 
	 * @param aNewMajors List of majors to add to the overall schedule
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this)
	 */
	public addMajors(aNewMajors: Degree[]): void
	{
		// Loop through the list and add them to the overall schedule
		for (let newMajor of aNewMajors)
		{
			this.addMajor(newMajor);
		}
	}

	/**
	 * Removes a single Major from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldMajor Major to be removed
	 */
	public removeMajor(anOldMajor: Degree): void 
	{
		// Get location of the major and remove it 
		var indexOfMajor = this.theMajors.indexOf(anOldMajor);
		if(indexOfMajor != -1) 
		{
			this.theMajors.splice(indexOfMajor, 1);
		}

		// Update the overall attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Removes a major list from the overall schedule, modifies overall credits, difficulty, and 
	 * messages. Uses removeMajor. 
	 * @param anOldMajors: Major list to be removed
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this
	 */
	public removeMajors(anOldMajors: Degree[]): void
	{
		// Loop through the list and remove them 
		for (let oldMajor of anOldMajors)
		{
			this.removeMajor(oldMajor);
		}
	}

	/**
	 * Add a single minor to the overall schedule, modifies overall credits, difficulty, and messages
	 * @param aNewMinor Minor to add to the overall schedule
	 */
	public addMinor(aNewMinor: Degree): void 
	{
		// Add the minor to overall list 
		this.theMinors.push(aNewMinor);

		// Update overall attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Add a list of minors to the overall schedule, modifies semester credits, difficulty, and 
	 * messages. Uses addMinor. 
	 * @param aNewMinors List of minors to add to the overall schedule
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this)
	 */
	public addMinors(aNewMinors: Degree[]): void
	{
		// Loop through the list and add them to the overall schedule
		for (let newMinor of aNewMinors)
		{
			this.addMinor(newMinor);
		}
	}

	/**
	 * Removes a single Minor from the overall schedule, modifies overall credits, difficulty, 
	 * and messages
	 * @param anOldMinor Minor to be removed
	 */
	public removeMinor(anOldMinor: Degree): void 
	{
		// Get location of the major and remove it 
		var indexOfMinor = this.theMinors.indexOf(anOldMinor);
		if(indexOfMinor != -1) 
		{
			this.theMinors.splice(indexOfMinor, 1);
		}

		// Update the overall attributes 
		this.updateCredits();
		this.updateMessages();
	}

	/**
	 * Removes a Minor list from the overall schedule, modifies overall credits, difficulty, and 
	 * messages. Uses removeMinor. 
	 * @param anOldMinors: Minor list to be removed
	 * TODO: Adjusts, technically n^2 (updating attributes causes another loop, could have a flag
	 * to deal with this
	 */
	public removeMinors(anOldMinors: Degree[]): void
	{
		// Loop through the list and remove them 
		for (let oldMinor of anOldMinors)
		{
			this.removeMinor(oldMinor);
		}
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