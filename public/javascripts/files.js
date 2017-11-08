'use strict';
let path = ["dir", "dir1", "dir4"];
let currentDirectory;
let pathHTML;
let itemsHTML;
let data = {
  dir: {
    dir1: {
      dir4: {
        dir5: {
          memo: {
            memo3: 3,
            memo4: 4
          }
        },
        id: 5
      },
      id: 2
    },
    dir2: {
      id: 3
    },
    dir3: {
      id: 4
    },
    id: 1
  },
  memo: {
    memo1: 1,
    memo2: 2
  },
  id: 0
};
window.onload = main;
function main() {
  pathHTML = document.getElementById("path");
  itemsHTML = document.getElementById("items");
  showDirectory();
  showPath();
}
function showDirectory() {
  recursive(0);
  function recursive(index) {
    currentDirectory = data.path[index];
    if ((path.length - 1) > index) {
      recursive(++index);
    }
  }
}
function showPath() {
  let pathString = "";
  if (path.length < 1) {
    pathHTML.innerText = "/";
  }
  for (let i in path) {
    pathString += " / " + path[i];
  }
  pathHTML.innerText = pathString;
}
function backDirectory() {
  if (path.length > 0) {
    path.pop();
  }
  showDirectory();
  showPath();
}
