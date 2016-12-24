// import {Todo} from './Model';

class Course
{
    // Vairab;es
    private theName: string;
    private theProfessor: string[];
    private theID: string;
    private theCredits: number;
    private theDescription: string;
    private thePrereqs: Course[];
    private theConcurrent: Course[];\
    // Scale of 1 to 5
	private theDifficulty: number; //TODO: make enum
    private theNotes: string[];

    public get theName(): string
    {
        return theName;
    }



}