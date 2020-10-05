import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

function convertToCamelCase(val) {
  //console.log(val);
  if (val.indexOf("-") != -1) {
    let key = val
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
      .join("");
    //console.log(key);
    key = key.charAt(0).toLowerCase() + key.substring(1);
    return key;
  }
  return val;
}

function validateType(val) {
  if (!isNaN(val)) {
    return val;
  }
  return `"${val}"`;
}

function generateCodeFromObject(obj) {
  let el = "<";
  el += obj.name;
  if (obj.style !== undefined && Object.keys(obj.style).length > 0) {
    let styles = Object.keys(obj.style);
    el += " style={{";
    for (let i = 0; i < styles.length; i++) {
      el += `${convertToCamelCase(styles[i])} : ${validateType(
        obj.style[styles[i]]
      )}`;
      if (i <= styles.length - 2) {
        el += ",";
      }
    }
    el += "}}";
  }
  if (obj.children !== undefined && obj.children.length > 0) {
    el += ">\n";
    for (let i = 0; i < obj.children.length; i++) {
      el += generateCodeFromObject(obj.children[i]);
    }
    el += "</" + obj.name + ">\n";
  } else {
    el += "/>\n";
  }
  return el;
}

module.exports = generateCodeFromObject;

// ReactDOM.render(<App />, document.getElementById("root"));
