# Contributing to the project
Contributing is really simple, as long as we follow some simple rules:
1. Coding style and,
2. How to submit changes

## Coding style
To simplify the process we have an .editorconfig file in each project. Stick to an IDE or editor that supports and respects .editorconfig files. Consistency leads to fewer problems!

That said here's a short generic checklist:
1. If a language has some standard formatting guidelines, try to stick to it.
2. Names should generally be legible and meaningful, e.g.:
    1. Good: `_dummy = None`
    2. Bad (less good?) single char names or names like `a = ...`, `a1 = ...`, `a2 = ...` in the same scope. It gets really hard to read code like this.


## How to submit a pull request
Create a feature branch for your changes and try to keep each commit each commit to be an independent feature. 

[Here's a good guide on this](http://codeinthehole.com/writing/pull-requests-and-other-good-practices-for-teams-using-github/)

Cheat-sheet for steps:
1. Fork this repo
2. Clone it: `git clone https://github.com/<my_username>/course-scheduler.git`
3. Create a branch for your awesome feature
    1. Standard: `git checkout -b feature/<awesome_feature>`
    2. [GitFlow](http://danielkummer.github.io/git-flow-cheatsheet/) (recommended): `git flow feature start <awesome_feature>`
4. Once you're done, push your changes to your fork or publish them if you're using GitFlow
    1. Standard: `git push -u origin feature/<awesome_feature>`
    2. GitFlow: `git flow feature publish <awesome_feature>` 
5. [Submit a pull request by comparing changes to our repo](https://help.github.com/articles/creating-a-pull-request/)
6. We'll review your changes and let you know if anything else needs to be done