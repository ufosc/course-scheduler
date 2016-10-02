import React, { Component } from 'react';
import Semester from './Semester.js'

// This displays all the semester and their respective classes
class SemesterList extends Component
{

	// Create state for search
	constructor()
	{
		super();
		this.state =
			{
				theSearch: ''
			};
	}

	// Update the search and add resitcrtions if neccesry
	updateSearch(event)
	{
		this.setState({theSearch: event.target.value});
	}

	render()
	{
		// // Do a search of courses
		// let filteredCourses = this.props.semesterInfo.filter((aCourse) =>
		// 	{
		// 		console.log("Not this thing");
		// 		// See if a matching letter exists regrdless of case
		// 		return aCourse.name.toLowerCase().indexOf(this.props.filter.toLowerCase) !== 1;
		// 	}
		// );

		return (
			<div>
				{/* Add search for names of different courses */}
				<input type="text"
					value={this.state.theSearch}
					onChange={this.updateSearch.bind(this)}
				/>

				<ul>
					{ /* Go through the entire list of semesters */}
					{this.props.semesterList.map((aSemester) =>
						{
							return <Semester semesterInfo={aSemester}
								filter={this.state.theSearch}
								key={aSemester.theId}/>
						})
					}
				</ul>
			</div>
		);
	}
}

export default SemesterList;

// import React, { Component } from 'react';
// import Course from './Course.js'
//
// // This is a single semester and it's classes. It should derive total credit hours from the classes.
// class Semester extends Component
// {
// 	render()
// 	{
// 		console.log("Do a thing!");
// 		// Do a search of courses
// 		let filteredCourses = this.props.semesterInfo.filter((aCourse) =>
// 			{
// 				console.log("Not this thing");
// 				// See if a matching letter exists regrdless of case
// 				return aCourse.name.toLowerCase().indexOf(this.props.filter.toLowerCase) !== 1;
// 			}
// 		);
//
// 		return (
// 			<div>
// 				<div>
// 					{/* The header for the semester, including number and credit hours*/}
// 					{this.props.semesterInfo.theTitle}
// 					<ul>
// 						{/*Just displaying the non filtered text*/ }
// 						{this.props.semesterInfo.theCourses.map((aCourse) =>
// 							{
// 								return <Course course={aCourse} key={aCourse.theId}/>
// 							})
// 						}
// 						{/* Go through all the classes */}
// 						// {filteredCourses.map((aCourse) =>
// 						// 	{
// 						// 		return <Course course={aCourse} key={aCourse.theId}/>
// 						// 	})
// 						// }
// 					</ul>
// 				</div>
// 			</div>
// 		);
// 	}
// }
//
// export default Semester;
