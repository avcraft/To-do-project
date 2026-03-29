const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputRow = document.getElementById("input-row");

// 1. Add task via Button or Enter Key
function addTask() {
  if (inputBox.value.trim() === "") {
    // Feedback if empty: Shake the input bar
    inputRow.classList.add("shake");
    setTimeout(() => inputRow.classList.remove("shake"), 400);
  } else {
    let li = document.createElement("li");
    li.textContent = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // The 'x' symbol
    li.appendChild(span);

    inputBox.value = "";
    saveData();
  }
}

// Support for Enter Key
inputBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

// 2. Handle Click on List (Check or Delete)
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      // Smooth removal: slide out then remove
      const parent = e.target.parentElement;
      parent.style.opacity = "0";
      parent.style.transform = "translateX(20px)";

      setTimeout(() => {
        parent.remove();
        saveData();
      }, 300);
    }
  },
  false,
);

// 3. Persistence (LocalStorage)
function saveData() {
  localStorage.setItem("warriorData", listContainer.innerHTML);
}

function showTask() {
  const savedContent = localStorage.getItem("warriorData");
  if (savedContent) {
    listContainer.innerHTML = savedContent;
  }
}

showTask();
