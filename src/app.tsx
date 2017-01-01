
// Remember to rename the file from app.ts to app.tsx
// and to keep it in the src/ directory.

import * as React from "react";
import * as ReactDOM from "react-dom";
import Hello from "./views/Hello";

ReactDOM.render(
  <Hello word="World!" />,
  document.getElementById("root")
);

console.log("It works!");

