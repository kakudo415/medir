'use strict';
let folders = {
  "name": "root",
  "folder": [
    {
      "name": "Folder1",
      "folder": [
        {
          "name": "Folder4",
          "folder": [],
          "file": []
        }
      ],
      "file": []
    },
    {
      "name": "Folder2",
      "folder": [],
      "file": [
        "6.txt"
      ]
    },
    {
      "name": "Folder3",
      "folder": [],
      "file": []
    }
  ],
  "file": [
    "1.txt",
    "2.txt",
    "3.txt",
    "4.txt",
    "5.txt"
  ]
}
let address = [];
let addressHTML;
let itemsHTML;
window.onload = function () {
  addressHTML = document.getElementById("address");
  itemsHTML = document.getElementById("items");
  for (let i = 0; i < 5; i++) {
    address.push("Path" + i);
  }
  refreshDisplay();
}
function addressToString(input) {
  let output = "";
  for (let i = 0; i < input.length; i++) {
    output += input[i] + "/";
  }
  return output;
}
function currentDirectory(input){
  
}
function backDirectory() {
  if (address.length > 1) {
    address.pop();
  }
  refreshDisplay();
}
function refreshDisplay() {
  addressHTML.innerText = addressToString(address);
}
