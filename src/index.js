import React from 'react';
import ReactDOM from 'react-dom';
import App from './scripts/App';
import './styles/index.css';

// Temporary data. In the furture it will come from a database. Scrool down to bottom to see render,
let semesterList = [
	{
		theId: '1',
		theTitle: 'First',
		theCourses: [
			{
				theId: '1',
				theName: 'Code 1',
				theCredits: '3',
			},
			{
				theId: '2',
				theName: 'Code 2',
				theCredits: '3',
			},
			{
				theId: '3',
				theName: 'Code 3',
				theCredits: '2',
			}
		]
	},
	{
		theId: '2',
		theTitle: 'Second',
		theCourses: [
			{
				theId: '1',
				theName: 'Code 4',
				theCredits: '3',
			},
			{
				theId: '2',
				theName: 'Code 5',
				theCredits: '3',
			},
			{
				theId: '3',
				theName: 'Code 6',
				theCredits: '2',
			}
		]
	},
	{
		theId: '3',
		theTitle: 'Third',
		theCourses: [
			{
				theId: '1',
				theName: 'Code 7',
				theCredits: '3',
			},
			{
				theId: '2',
				theName: 'Code 8',
				theCredits: '3',
			},
			{
				theId: '3',
				theName: 'Code 9',
				theCredits: '2',
			}
		]
	}
]

// This creates the rest of the app.
ReactDOM.render(
	<App semesterList={semesterList}/>,
	document.getElementById('root')
);
