import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

function generateJSX(obj) {
  let res = "<";
  res += obj.name + " ";

  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    let styleIterator = Object.keys(obj.style);
    res += "style={{";
    for (let i = 0; i < styleIterator.length; i++) {
      res += `${styleIterator[i]} : ${obj.style[styleIterator[i]]};`;
    }
    res += "}}";
  }

  if (obj.children !== undefined && obj.children.length > 0) {
    res += ">\n";
    for (let i = 0; i < obj.children.length; i++) {
      res += generateJSX(obj.children[i]);
    }
    res += `</${obj.name}>`;
  } else {
    res += "/>";
  }

  return res;
}

function generateCodeFromObject(obj) {
  return generateJSX(obj);
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
