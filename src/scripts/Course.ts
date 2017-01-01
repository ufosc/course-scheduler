
/**
 * The type of ratings possible. 
 */
export enum Difficulty
{
	Insane = 5,
	Difficult = 4,
	Challenging = 3,
	Average = 2,
	Easy = 1
}

/**
 * Records the number of ratings and overall average
 */
class Rating
{
	private theNumberOfRatings: number;
	public theAverageRating: number;

	/**
	 * Create a rating with a number of ratings and the average rating
	 */
	constructor(aNumberOfRatings: number, anAverageRating: number)
	{
		this.theNumberOfRatings = aNumberOfRatings;
		this.theAverageRating = anAverageRating;
	}

	/**
	 * Returns what the overall rating of is 
	 */
	public get theOverallDifficulty(): Difficulty
	{
		// Get the integer version of the average 
		return Number(this.theAverageRating.toFixed(0));
	}

	/**
	 * Add a new rating, increments number of ratings and adjust the 
	 */
	public addRating(aNewRating: Difficulty): void
	{
		// Get the previous sum, then increment the number of ratings and take a new average
		let previousSum: number = this.theNumberOfRatings * this.theNumberOfRatings;
		this.theAverageRating = (previousSum + aNewRating) / ++this.theNumberOfRatings;
	}

	/**
	 * Returns a human readable sentence with the rating values 
	 */
	public toString(): string
	{
		return `The average is ${this.theAverageRating} for a ${this.theOverallDifficulty}
			 from ${this.theNumberOfRatings}`
	}

	// TODO: toJSON()
}

/**
 * Contains all information about a course 
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
	// TODO: PostReqs?

	// From users
	private theDifficultyRatings: Rating;
	public theNotes: string[];

	constructor(aName: string, anID: string, aDescription: string, aCredits: number, 
			aProfessors: string[], aDifficultyRatings: Rating, aNotes: string[], aPreReqs: Course[])
	{
		this.theName = aName;
		this.theID = anID;
		this.theDescription = aDescription;
		this.theCredits = aCredits;
		this.theProfessors = aProfessors;
		this.theDifficultyRatings = aDifficultyRatings;
		this.theNotes = aNotes;
		this.thePreReqs = aPreReqs;
	}

	// TODO: fromJSON()
	
	// TODO: toJSON()

	// Rating methods 
	/**
	 * Returns what the difficulty rating of the class is 
	 */
	public get theDifficultyRating(): Difficulty
	{
		// Use the rating's method
		return this.theDifficultyRatings.theOverallDifficulty;
	}

	/**
	 * Add a new rating to the course
	 */
	public addRating(aNewRating: Difficulty): void
	{
		this.theDifficultyRatings.addRating(aNewRating);
	}

}