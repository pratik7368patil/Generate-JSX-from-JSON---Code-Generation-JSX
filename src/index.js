import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

function convertProp(prop) {
  if (prop.indexOf("-") !== -1) {
    let res = prop
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.substr(1))
      .join("");
    res = res.charAt(0).toLowerCase() + res.substr(1);
    return res;
  }
  return prop;
}

function convertPropKey(key) {
  if (!isNaN(key)) {
    return key;
  }
  return `"${key}"`;
}

function generateJSX(obj) {
  let res = "<";
  res += obj.name + " ";

  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    let styleIterator = Object.keys(obj.style);
    res += "style={{";
    for (let i = 0; i < styleIterator.length; i++) {
      res += `${convertProp(styleIterator[i])} : ${convertPropKey(
        obj.style[styleIterator[i]]
      )},`;
    }
    res = res.slice(0, -1);
    res += "}}";
  }

  if (obj.children !== undefined && obj.children.length > 0) {
    res += ">\n";
    for (let i = 0; i < obj.children.length; i++) {
      res += generateJSX(obj.children[i]);
    }
    res += `</${obj.name}>`;
  } else {
    res += "/> \n";
  }

  return res;
}

function generateCodeFromObject(obj) {
  return generateJSX(obj);
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
