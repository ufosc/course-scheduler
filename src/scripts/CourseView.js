import React, { Component } from 'react';

// This is a single class. It contains name, difficulty, credits, etc
class CourseView extends Component
{
	// Create html for each course
	render()
	{
		return (
			<div>
				<li>
					{/* Class names and other information*/}
					{this.props.course.theName} ({this.props.course.theCredits})
				</li>
			</div>
		);
	}
}

export default CourseView;
