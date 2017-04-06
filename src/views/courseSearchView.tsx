// Display for the whole schedule 
import * as React from "react";
import CourseView from "./courseView"
import {Course, ICourse} from "../scripts/Course"

class CourseSearchView extends React.Component<any, any> 
{
	constructor(props: any) 
	{
    super(props);
		// Convert the passed data to a parsed JSON make it an OverallSchedule
		this.state = {courses: []};
  }

	private searchCourse(searchTerm: string): void
	{
		// Don't update without sufficient data 
		if (searchTerm.length < 3)
		{
			return;
		}
		// Send request 
		// Update course list 
		//this.state.courses = result;
	}

  render() 
	{
		let courserList: Course[] = this.state.courses.map(function(tempCourse)
		{				
			return <CourseView aCourse={tempCourse}/>;
		});

		return(
			<div>
				<p>Search</p>
				<p>Results:</p>
				<ul>
					{courserList}
				</ul>
			</div>
		);

  }
}

export default CourseSearchView;