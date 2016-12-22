/**
 * This class defines the attributues of a Course. In addition to the standard information from the
 * course website, a difficulty, notes, and past professors section can be added. There is also a
 * done state, that stops the course from being moved.
 */
module.exports = function Course()
{
	// Values from UF
	this.theName = "";

  this.theCredits = 3;
	this.theDescription = "Is a class that does things.";
	this.thePrereqs = [];
	this.theConcurents = [];
	this.theRequiredFor = [];

	// Value from us
	this.theProfessors = [];
	// Scale of 1 to 5
	this.theDifficulty = 3;
	this.theNotes = "Best in the spring with Dr. Professor.";

	// Values modified by program
	this.complete = false;

	// Getters and setters for UF values
  this.getName = function()
	{
    return this.theName;
  };
	// String
	this.setName = function(aName)
	{
		this.theName = aName;
	};

	this.getCredits = function()
	{
    return this.theCredits;
  };
	// Integer
	this.setCredits = function(aCredits)
	{
		this.theCredits = aCredits;
	};

	this.getDescription = function()
	{
    return this.theDescription;
  };
	// String
	this.setDescription = function(aDescription)
	{
		this.theDescription = aDescription;
	};

	this.getPrereqs = function()
	{
    return this.thePrereqs;
  };
	this.clearPrereqs = function()
	{
    this.thePrereqs = [];
  };
	// For one required class. The name is added as an array.
	this.addSinglePrereqs = function(aPrereq)
	{
		this.thePrereqs.push([aPrereq.getName()]);
	};
	// For multiple classes that fill one requirement. Arg is an array of courses.
	// Each courses' name is added as an array into the prereq array.
	this.addOptionalSetPrereqs = function(aPrereqArray)
	{

		this.thePrereqs.push(aPrereqArray);
	};

	this.getName = function()
	{
    return this.name;
  };
	this.setName = function(aName)
	{
		this.name = aName;
	};

}

module.exports = function Apple() {
    this.type = type;
    this.color = "red";
    this.getInfo = function() {
        return this.color + ' ' + this.type + ' apple';
    };
}

var User = require('./user.js');
var user = new User();
