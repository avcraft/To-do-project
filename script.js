const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputRow = document.getElementById("input-row");

function addTask() {
  if (inputBox.value.trim() === "") {
    inputRow.classList.add("shake");
    setTimeout(() => inputRow.classList.remove("shake"), 400);
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    inputBox.value = "";
    saveData();
  }
}

inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false,
);

function saveData() {
  localStorage.setItem("warriorData", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("warriorData") || "";
}
showTask();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
