'use strict';
let path = [];
let alreadyHave = [0];
let currentData;
let currentMemo;
let pathHTML;
let itemsHTML;
let memoHTML;
let memoTitle;
let memoContents;
let data = {
  dir: {
    dir1: {
      dir4: {
        dir5: {
          memo: {
            memo3: 3,
            memo4: 4
          },
          id: 6
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
  memoHTML = document.getElementById("memo");
  memoTitle = document.getElementById("memo-title");
  memoContents = document.getElementById("memo-contents");
  showDirectory();
  showPath();
}
function showDirectory() {
  currentData = data;
  if (path.length > 0) {
    recursive(0);
  }
  function recursive(index) {
    currentData = currentData[path[index]];
    if (alreadyHave.indexOf(currentData.id) == -1) {
      $.post(location.href + "/dir/" + path[index], {}, (res) => {
        console.log(res);
      });
    }
    if ((path.length - 1) > index) {
      recursive(++index);
    }
  }
  let contentsCount = 0;
  let source = "";
  for (let i in currentData) {
    if (i != "id" && i != "memo") {
      source += "<a onclick=changeDirectory(" + "'" + i + "'" + ");>" + i + "</a>";
      contentsCount++;
    } else if (i == "memo") {
      for (let i in currentData.memo) {
        source += "<a onclick=showMemo(" + "'" + i + "'" + ");>" + i + "</a>";
        contentsCount++;
      }
    }
  }
  if (contentsCount < 1) {
    source = "<div id='nocontents'>No Contents</div>";
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
function showMemo(name) {
  memoTitle.innerText = name;
  memoHTML.style.display = "block";
  currentMemo = name;
}
function hideMemo(){
  memoHTML.style.display = "none";
}
function saveMemo(){
  
}
function changeDirectory(name) {
  path.push(name);
  showDirectory();
  showPath();
}
function backDirectory() {
  if (path.length > 0) {
    path.pop();
  }
  showDirectory();
  showPath();
}
