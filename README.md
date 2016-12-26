# Course Scheduler

A dynamic course planner for planning out college semesters. 

## Technologies

We are using TypeScript with React to write this project. Other tools that are used are Node (with npm), Webpack, and Typings. 

[TypeScript](http://www.typescriptlang.org/) is a super-set of JavaScript that adds type safety and some nice features (like inheritance). This makes it feel more like other Object Oriented languages like Java. It compiles down to JavaScript, as specified in the tsconfig.json.
 
[React](https://facebook.github.io/react/) is a JavaScript framework that focuses on user interfaces. It improves efficiency by only changing what needs to changes. It also keeps out of the way of other functions. React uses jsx (or tsx in our case) files to render html components.

[Node](https://nodejs.org/) is a JavaScript runtime, however we use it's package manager, npm to keep track of various libraries we use, such as react. It's config file is package.json.

[Webpack](https://webpack.github.io/) is a module builder that combines all JavaScript into one succinct file. It also provides multiple tools such as a live reloader. It's config file webpack.config.js.

[Typings](https://github.com/typings/typings) is a TypeScript definition manager. It allows editors to easily plug into different systems (such as React) and show autocomplete. It's config file is typings.json.

## Getting Started

To start working on the project, first install [node](https://nodejs.org/). Version 4 or higher.

Clone this repository.

```
git clone https://github.com/ufosc/course-scheduler.git
cd course-scheduler
```

Install dependencies with Node and Typings. 

```
npm install
node_modules/.bin/typings install
```

To compile everything with output. 

```
npm run build
```

Then open index.html in your browser. 

To have it compile on change (still need to refresh browser).

```
npm run dev
``` 

### Resources

#### Setting Up

- [Typescript, Webpack, and React](https://medium.com/@fay_jai/getting-started-with-reactjs-typescript-and-webpack-95dcaa0ed33c#.icbywodz2)

#### React Tutorials

- [Official Tutorial](https://facebook.github.io/react/docs/getting-started.html)
- [Written Overview](https://scotch.io/tutorials/learning-react-getting-started-and-concepts)
- [Five Examples](http://tutorialzine.com/2014/07/5-practical-examples-for-learning-facebooks-react-framework/)
- [Video Series](https://www.youtube.com/watch?v=eOctQZ1EV0E&list=PLLnpHn493BHFfs3Uj5tvx17mXk4B4ws4p&index=1)
- [Code Academy](https://www.codecademy.com/learn/react-101)

#### Other links

- [React Apps](https://github.com/facebookincubator/create-react-app)
- [Drag and Drop](https://gaearon.github.io/react-dnd/)
- [Material Design Components](http://www.material-ui.com/#/)

## TODO
- [ ] Load course data from UF
- [ ] Order classes
	- [ ] Pre-reqs
	- [ ] Suggested pre-reqs
- [ ] Add already taken classes
- [ ] Interactive reordering
	- [ ] Feedback
		- [ ] Wrong order
		- [ ] Excess Hours
		- [ ] Minimum Hours
- [ ] Current semester view
	- [ ] Show possible times
	- [ ] Help choose available ones by preferences
- [ ] Search classes
- [ ] Rating for class/professor
- [ ] Predefined specialties (database comp sci)
- [ ] Add minor/major
- [ ] Save course list
