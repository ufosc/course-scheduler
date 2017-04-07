// Display for a single course
import * as React from "react";
import {Course, ICourse} from "../scripts/Course"

/**
 * Display a course and its information 
 */
class CourseView extends React.Component<any, any> 
{
	constructor(props: Course) 
	{
    super(props);
		this.state = {aCourse: this.props.aCourse};
  }

  render() 
	{
		return(
			<div>
				<p>Name: {this.state.aCourse.theName}</p>
				<p>ID: {this.state.aCourse.theID}</p>
				<p>Credits: {this.state.aCourse.theCredits}</p>
				<p>Difficulty: {this.state.aCourse.theDifficultyRating}</p>
			</div>
		);

  }
}

export default CourseView;