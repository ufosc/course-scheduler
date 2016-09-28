import React, { Component } from 'react';
import Semester from './Semester.js'

// This displays all the semester and their respective classes
class SemesterList extends Component
{
	// Create html for list of semesters
	render()
	{
		return (
			<div>
				<ul>
					{ /* Go through the entire list of semesters */}
					{this.props.semesterList.map((aSemester) =>
						{
							return <Semester semesterInfo={aSemester}
									key={aSemester.theId}/>
						})
					}
				</ul>
			</div>
		);
	}
}

export default SemesterList;
