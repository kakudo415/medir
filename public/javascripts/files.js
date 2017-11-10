'use strict';
let path = [];
let alreadyHave = [0];
let currentDirectory;
let currentMemo;
let parentID = [0];
let pathHTML;
let itemsHTML;
let memoHTML;
let memoTitle;
let memoContents;
let directory;
window.onload = main;
function main() {
  pathHTML = document.getElementById("path");
  itemsHTML = document.getElementById("items");
  memoHTML = document.getElementById("memo");
  memoTitle = document.getElementById("memo-title");
  memoContents = document.getElementById("memo-contents");
  $.ajax(location.href, {
    type: "post"
  }).done((data) => {
    directory = data;
  }).fail(() => {
    window.alert("Sorry.Communication with the server failed.");
  });
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
function renameDirectory() {
  let newName = window.prompt("Please enter new directory name", path[path.length - 1]);
  $.ajax(location.href + "/dir/edit/" + currentDirectory.id, {
    type: "put",
    data: {
      id: parentID[parentID.length - 1],
      rename: newName
    }
  }).done(() => {
    path[path.length - 1] = newName;
    let tmp = path[path.length - 1];
    backDirectory();
    currentDirectory[newName] = currentDirectory[tmp];
    delete currentDirectory[tmp];
    changeDirectory(newName);
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
}
function deleteDirectory() {
  let tmp = path[path.length - 1];
  $.ajax(location.href + "/dir/" + currentDirectory.id, {
    type: "delete",
    data: {
      id: parentID[parentID.length - 1]
    }
  });
  backDirectory();
  delete currentDirectory[tmp];
  showDirectory();
}
function showMemo(name) {
  currentMemo = name;
  memoTitle.innerText = name;
  $.ajax(location.href + "/memo/" + currentDirectory.memo[currentMemo], {
    type: "post"
  }).done((data) => {
    memoContents.innerText = data;
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  })
  memoHTML.style.display = "block";
}
function hideMemo() {
  memoHTML.style.display = "none";
}
function renameMemo() {
  hideMemo();
  let newName = window.prompt("Please enter new Memo name", currentMemo);
  $.ajax(location.href + "/memo/edit/" + currentDirectory.memo[currentMemo], {
    type: "put",
    data: {
      id: parentID[parentID.length - 1],
      rename: newName
    }
  }).done(() => {
    delete currentDirectory.memo[currentMemo];
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
  showMemo(newName);
}
function saveMemo() {
  $.ajax(location.href + "/memo/edit/" + currentDirectory.memo[currentMemo], {
    type: "put",
    data: {
      id: currentDirectory.id,
      value: memoContents.value
    }
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
}
function deleteMemo() {
  hideMemo();
  $.ajax(location.href + "/memo/" + currentDirectory.memo[currentMemo], {
    type: "delete",
    data: {
      id: parentID[parentID.length - 1]
    }
  }).done(() => {
    delete currentDirectory.memo[currentMemo];
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
  showDirectory();
}
function changeDirectory(name) {
  parentID.push(currentDirectory.id);
  path.push(name);
  showDirectory();
  showPath();
}
function backDirectory() {
  if (parentID.length > 0) {
    parentID.pop();
  }
  if (path.length > 0) {
    path.pop();
  }
  showDirectory();
  showPath();
}
function addDirectory() {
  let newName = window.prompt("Please enter new directory name");
  $.ajax(location.href + "/dir/create", {
    type: "put",
    data: {
      id: parentID,
      name: newName
    }
  }).done((data) => {
    currentDirectory[newName].id = data;
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
  showDirectory();
}
function addMemo() {
  let newName = window.prompt("Please enter new memo name");
  $.ajax(location.href + "/memo/create", {
    type: "put",
    data: {
      id: parentID,
      name: newName
    }
  }).done((data) => {
    currentDirectory.memo[newName] = data;
  }).fail(() => {
    console.log("Sorry.Communication with the server failed.");
  });
  showDirectory();
}
