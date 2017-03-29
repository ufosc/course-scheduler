// Initial view that loads everything

import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./views/Hello";
import OverallScheduleView from "./views/overallScheduleView";

ReactDOM.render(
  <Hello word="World!" />,
  <OverallScheduleView aSchedule=""/>,
  document.getElementById("root")
);

console.log("It works!");

