// Display for the whole schedule 
import * as React from "react";
import {OverallSchedule} from "../scripts/OverallSchedule"

class OverallScheduleView extends React.Component<OverallSchedule, any> {
  render() {
		let semesterList = this.props.theSemesters.map(function(aSemester)
			{
				//return <SemesterView theSemesters=aSemester/>; // Should be a constructor 
			})
    return (
      <ul>
				{semesterList}
			</ul>
    )
  }
}

export default OverallScheduleView;