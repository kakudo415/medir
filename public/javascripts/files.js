'use strict';
let path = ["dir", "dir1", "dir4"];
let alreadyHave = [0];
let currentData;
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
  currentData = data;
  recursive(0);
  function recursive(index) {
    currentData = currentData[path[index]];
    if (alreadyHave.indexOf(currentData.id) == -1) {
      $.post(location.href + "/dir/" + path[index], , (data) => {

      });
    }
    if ((path.length - 1) > index) {
      recursive(++index);
    }
  }
  let source = "";  
  for (let i in currentData) {
    // ここで直下の要素についての処理
  }
  itemsHTML.innerHTML = source;
}
function showPath() {
  let pathString = "";
  if (path.length < 1) {
    pathString = "/";
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
