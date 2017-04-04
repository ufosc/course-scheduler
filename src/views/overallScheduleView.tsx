// Display for the whole schedule 
import * as React from "react";
import {OverallSchedule, IOverallSchedule} from "../scripts/OverallSchedule"

class OverallScheduleView extends React.Component<any, any> {

	constructor(props: any) {
    super(props);
		// this.state = { aSchedule: OverallSchedule.fromJson(this.props.aSchedule) };
		this.state = { aSchedule: JSON.parse(this.props.aSchedule) };

		console.log(this.state.aSchedule instanceof Object);
		
  }

  render() 
	{
		return(
		<div>
			{this.state.aSchedule.theMajors[0].theName}
		</div>
		);

  }
}

export default OverallScheduleView;

/*let semesterList = this.props.theSchedule.theSemesters.map(function(aSemester)
	{
		//return <SemesterView theSemesters=aSemester/>; // Should be a constructor 
	})
return (
	<ul>
		{semesterList}
	</ul>
)*/