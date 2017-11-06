window.addEventListener("load", () => {
  let change = document.getElementsByClassName("change")[0];
  let title = document.getElementsByClassName("title")[0];
  let submit = document.getElementsByClassName("submit")[0];
  let form = document.getElementsByClassName("form")[0];

  change.onclick = () => {
    if(change.innerText == "→ Create a new room") {
      change.innerText = "→ Enter the room";
      title.innerText = "Room name input";
      submit.value = "Create";
      form.action = "/create"
    }else {
      change.innerText = "→ Create a new room";
      title.innerText = "Enter room name";
      submit.value = "Join!";
      form.action = "/"
    }
  }
});
