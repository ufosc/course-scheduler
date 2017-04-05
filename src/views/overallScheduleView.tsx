// Display for the whole schedule 
import * as React from "react";
import {OverallSchedule, IOverallSchedule} from "../scripts/OverallSchedule"
import SemesterView from "./semesterView"

class OverallScheduleView extends React.Component<any, any> {

	constructor(props: any) {
    super(props);
		// Convert the passed data to a parsed JSON make it an OverallSchedule
		this.state = { aSchedule: OverallSchedule.fromJson(JSON.parse(this.props.aSchedule))};
  }

  render() 
	{
		let semesterList = this.state.aSchedule.theSemesters.map(function(aSemester)
			{
				return <SemesterView aSemester={aSemester}/>;
			})

		return(
		<div>
			<p>Major: {this.state.aSchedule.theMajors[0].theName}</p>
			<p>Minor: {this.state.aSchedule.theMinors[0].theName}</p>
			<p>Semesters:</p>
			<ul>
				{semesterList}
			</ul>
		</div>
		);

  }
}

export default OverallScheduleView;