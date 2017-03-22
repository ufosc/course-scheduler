# Course Planner Design 

## About

`course-planner` is an application to help students plan course loads for semesters based of their major/minor, interests, and course difficulty.

## Components

There are three main components in this application: the data retrieval, the backend, and the user-interface. We briefly describe each with technologies that power them.

### Data

Most of the data is collected from UF's APIs and marshalled into JSON on disk. Information not available from API's will use scrappers. The scrapers are currently written in python and C# using scrappy (schedule of courses, pre-requisites) and selenium (course evaluations) respectively.

Relevant github issues to get started:
- [Data Issues](https://github.com/ufosc/course-scheduler/labels/data)

### Backend

The glue connecting the Data and Frontend, this is currently using a {flask, bottle} instance for routes and tornado for the webserver. The backend is just a bare-bones API meant to simplify queries on course data. The backend in this case is closer to middleware connecting the frontend to it's data needs.

Relevant github issues to get started:
- [Backend Issues](https://github.com/ufosc/course-scheduler/labels/backend)

### Frontend

TypeScript will be used to store and manipulate the course and semester information. This includes sorting the courses based on prerequisites and difficulty. React gets information form the Typescript to display each of the UI elements.

Relevant github issues to get started:
- [Frontend Issues](https://github.com/ufosc/course-scheduler/labels/frontend)

<!-- 
    @TODO: ARCHITECTURE DIAGRAM GOES HERE 
-->

## Resources 

### Data

- [Scrappy](https://scrapy.org/)
- [Selenium](http://docs.seleniumhq.org/)

### Backend

- [Flask](http://flask.pocoo.org/)
- [Bottle](http://bottlepy.org/docs/dev/)

### Frontend

- [Typescript](https://github.com/ufosc/resources/blob/master/resources/typescript.md)
- [React](https://github.com/ufosc/resources/blob/master/resources/react.md)
