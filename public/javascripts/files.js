'use strict';
let path = [];
let alreadyHave = [0];
let currentDirectory;
let currentMemo;
let pathHTML;
let itemsHTML;
let memoHTML;
let memoTitle;
let memoContents;
let directory = {
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
  currentDirectory = directory;
  if (path.length > 0) {
    recursive(0);
  }
  function recursive(index) {
    currentDirectory = currentDirectory[path[index]];
    if (alreadyHave.indexOf(currentDirectory.id) == -1) {
      $.ajax(location.href + "/dir/" + path[index],
        {
          type: "post"
        }).done((data) => {
          currentDirectory.push(data);
          alreadyHave.push(data.id);
        }).fail(() => {
          console.log("Sorry.Communication with the server failed.");
        }
        );
    }
    if ((path.length - 1) > index) {
      recursive(++index);
    }
  }
  let contentsCount = 0;
  let source = "";
  for (let i in currentDirectory) {
    if (i != "id" && i != "memo") {
      source += "<a onclick=changeDirectory(" + "'" + i + "'" + ");>" + i + "</a>";
      contentsCount++;
    } else if (i == "memo") {
      for (let i in currentDirectory.memo) {
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
    $("#header > .rename")[0].style.display = "none";
    $("#header > .delete")[0].style.display = "none";
  } else {
    for (let i in path) {
      pathString += " / " + path[i];
    }
    $("#header > .rename")[0].style.display = "block";
    $("#header > .delete")[0].style.display = "block";
  }
  pathHTML.innerText = pathString;
}
function showMemo(name) {
  memoTitle.innerText = name;
  memoHTML.style.display = "block";
  currentMemo = name;
}
function hideMemo() {
  memoHTML.style.display = "none";
}
function saveMemo() {
  $.ajax
}
function deleteMemo() {
  console.log("Delete" + currentMemo + currentDirectory.id);
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
