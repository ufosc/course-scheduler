// Display for a semester and it's courses
import * as React from "react";
import {Semester, ISemester} from "../scripts/Semester"
import CourseView from "./courseView"

class SemesterView extends React.Component<any, any> {

	constructor(props: any) {
    super(props);
		this.state = {aSemester: this.props.aSemester};		
		console.log(this.state.aSemester);
		
  }

  render() 
	{
		let courserList = this.state.aSemester.theCourses.map(function(aCourse)
			{
				return <CourseView aCourse={aCourse}/>;
			});

		return(		
		<div>
			<p>Year: {this.state.aSemester.theYear}</p>
			<p>Season: {this.state.aSemester.theSeason}</p>
			<p>Credits: {this.state.aSemester.theCredits}</p>
			<p>Courses: </p>
			<ul>
				{courserList}
			</ul>
		</div>
		);

  }
}

export default SemesterView;