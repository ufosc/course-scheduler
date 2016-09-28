import React, { Component } from 'react';
import '../styles/App.css';
import SemesterList from './SemesterList.js'

// This is the main structure for the app. It contains the main components.
class App extends Component
{
	// This will display all the main components. In the future shouldn't have any direct html.
	render()
	{
		return (
			<div className="App">
				<p className="App-intro">
					Below is a basic model of a semester list
				</p>
				{/* The list of classes in order */}
				<SemesterList semesterList={this.props.semesterList}/>
			</div>
		);
	}
}

export default App;
