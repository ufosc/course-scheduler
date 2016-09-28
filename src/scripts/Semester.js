import React, { Component } from 'react';
import Course from './Course.js'

// This is a single semester and it's classes. It should derive total credit hours from the classes.
class Semester extends Component
{
	// Create html for individual semster and classes
	render()
	{
		return (
			<div>
				<div>
					{/* The header for the semester, including number and credit hours*/}
					{this.props.semesterInfo.theTitle}
					<ul>
						{/* Go through all the classes */}
						{this.props.semesterInfo.theCourses.map((aCourse) =>
							{
								return <Course course={aCourse} key={aCourse.theId}/>
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default Semester;
