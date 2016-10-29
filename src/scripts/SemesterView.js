import React, { Component } from 'react';
import CourseView from './CourseView.js'

// This is a single semester and it's classes. It should derive total credit hours from the classes.
class SemesterView extends Component
{
	// Create html for individual semsters and classes
	render()
	{

		// This returns only the courses whos name or credit hour match the search

		let filteredCourses = this.props.semesterInfo.theCourses.filter(
			(aCourse) =>
			{
				return aCourse.theName.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1 ||
						aCourse.theCredits.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1;
			}
		);

		return (
			<div>
				<div>
					{/* The header for the semester, including number and credit hours */}
					{this.props.semesterInfo.theTitle}
					<ul>
						{/* Go through all the classes */}
						{filteredCourses.map((aCourse) =>
							{
								return <CourseView course={aCourse} key={aCourse.theId}/>
							})
						}

					</ul>
				</div>
			</div>
		);
	}
}

export default SemesterView;
