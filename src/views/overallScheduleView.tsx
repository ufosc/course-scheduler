// Display for the whole schedule 
import * as React from "react";
import {OverallSchedule, IOverallSchedule} from "../scripts/OverallSchedule"
import SemesterView from "./semesterView"
import {Semester, ISemester} from "../scripts/Semester"

/**
 * This contains the whole schedule including semesters and courses 
 */
class OverallScheduleView extends React.Component<any, any> 
{
	constructor(props: IOverallSchedule) 
	{
    super(props);
		// Convert the passed data to a parsed JSON make it an OverallSchedule
		this.state = {aSchedule: this.props.aSchedule};
		console.log("Overall Schedule test");
		console.log(this.state.aSchedule);
  }

  render() 
	{
		let semesterList: Semester[] = this.state.aSchedule.theSemesters.map(function(aSemester)
		{
			// console.log("Listing Semesters");
			// console.log(aSemester);
			return <SemesterView aSemester={aSemester}/>;
		});

		return(
			<div>
				<p>Major: {this.state.aSchedule.theMajors[0].theName}</p>
				<p>Minor: {this.state.aSchedule.theMinors[0].theName}</p>
				<p> Total Credits: {this.state.aSchedule.theCredits}</p>
				<p>Semesters:</p>
				<ul>
					{semesterList}
				</ul>
			</div>
		);

  }
}

export default OverallScheduleView;