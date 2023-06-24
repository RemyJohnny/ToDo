import "./style.css";
import myDay from "./myDay";
import renderTasksPage from "./tasks";
import renderImportantPage from "./important";
import renderWeekPage from "./thisWeek";
import renderTemplatePage from "./template";
import { format, isToday, isThisWeek } from "date-fns";

const content = document.querySelector("#content");
const tabBtns = document.querySelector("#tabBtns");
const createFolderBtn = document.querySelector("#createFolder");
const newFolderName = document.querySelector("#newFolder");

const myDayPage = myDay(content);
const tasksPage = renderTasksPage(content);
const importantPage = renderImportantPage(content);
const weekPage = renderWeekPage(content);
const templatePage = renderTemplatePage(content, "learn React");

myDayPage.classList.add("currentTab");

const controller = (() => {
  const switchTab = (event) => {
    const clicked = event.target.closest("li");
    const tabId = clicked.dataset.tabId;
    const tab = document.getElementById(tabId);

    const tabLinks = document.querySelectorAll("[data-tab-id]");
    tabLinks.forEach((link) => {
      link.classList.remove("open");
    });
    clicked.classList.add("open");

    const tabContents = document.querySelectorAll(".tabContent");
    tabContents.forEach((tabContent) => {
      tabContent.classList.add("hidden");
      tabContent.classList.remove("currentTab");
    });
    tab.classList.remove("hidden");
    tab.classList.add("currentTab");
  };
  function renderForm() {
    const form = document.createElement("div");
    const formButtons = document.createElement("div");
    const importantBtn = document.createElement("div");
    const dueDateDiv = document.createElement("div");
    const dueDateBtn = document.createElement("input");
    const flagDiv = document.createElement("div");
    const blueFlag = document.createElement("div");
    const yellowFlag = document.createElement("div");
    const redFlag = document.createElement("div");
    const headDiv = document.createElement("div");
    const inputDiv = document.createElement("div");
    const nameInput = document.createElement("input");

    const btnDiv = document.createElement("div");
    const addTaskBtn = document.createElement("span");

    form.classList.add("shadow", "rounded-md", "overflow-hidden", "mt-8");
    headDiv.classList.add("flex", "items-center", "bg-white");
    inputDiv.classList.add("flex-grow");
    nameInput.classList.add(
      "block",
      "font-body",
      "text-sm",
      "w-full",
      "h-6",
      "focus:border-0",
      "focus:outline-none"
    );
    nameInput.setAttribute("autofocus", "");
    nameInput.setAttribute("placeholder", "Add task");
    nameInput.setAttribute("type", "text");

    formButtons.setAttribute("id", "formBtn");
    formButtons.classList.add(
      "flex",
      "items-center",
      "p-4",
      "gap-2",
      "border-t"
    );
    btnDiv.classList.add("flex", "flex-grow", "justify-end");
    addTaskBtn.classList.add(
      "py-1",
      "px-3",
      "font-body",
      "bg-white",
      "border",
      "cursor-pointer",
      "text-sm"
    );
    importantBtn.classList.add("cursor-pointer");
    dueDateDiv.classList.add("flex", "items-center", "cursor-pointer");
    dueDateBtn.classList.add(
      "font-body",
      "font-thin",
      "text-sm",
      "focus:border-0",
      "focus:outline-none"
    );
    dueDateBtn.setAttribute("type", "date");
    flagDiv.classList.add("flex", "border", "py-1", "px-2", "rounded-md");

    headDiv.innerHTML = `<div class="border border-blue-600 rounded-full m-4 w-4 h-4"></div>`;

    importantBtn.innerHTML = `
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1"
    stroke="currentColor"
    class="w-5 h-5"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
    `;
    blueFlag.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="blue" class="w-4 h-4 cursor-pointer">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    `;
    yellowFlag.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="yellow" class="w-4 h-4 cursor-pointer">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    `;
    redFlag.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="red" class="w-4 h-4 cursor-pointer">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
    `;

    form.appendChild(headDiv);
    headDiv.appendChild(inputDiv);
    inputDiv.appendChild(nameInput);
    form.appendChild(formButtons);
    formButtons.appendChild(dueDateDiv);
    dueDateDiv.appendChild(dueDateBtn);
    formButtons.appendChild(flagDiv);
    flagDiv.appendChild(blueFlag);
    flagDiv.appendChild(yellowFlag);
    flagDiv.appendChild(redFlag);
    formButtons.appendChild(importantBtn);
    formButtons.appendChild(btnDiv);
    btnDiv.appendChild(addTaskBtn);
    addTaskBtn.textContent = "Add";

    addTaskBtn.addEventListener("click", () => {
      if (nameInput.value !== "") {
        let newTodo = new toDo(nameInput.value, dueDateBtn.value);
        appLogic.appointTask(newTodo);
        appLogic.addTodo(newTodo);
        nameInput.value = "";
        dueDateBtn.value = "";
      } else {
        //console.log(isThisWeek(new Date(dueDateBtn.value)));
        console.log("fill it up");
      }
    });
    return form;
  }

  function renderTask(todo) {
    const task = document.createElement("div");
    const checkBtn = document.createElement("div");
    const importantBtn = document.createElement("div");
    const infoDiv = document.createElement("div");

    checkBtn.classList.add("border", "border-blue-600", "rounded-full", "m-4");
    importantBtn.classList.add("flex-grow", "flex", "justify-end", "mr-4");

    infoDiv.innerHTML = `
    <span class="block font-body text-sm">${todo.title}</span>
    <div  class=" font-body font-thin text-xs">
      <span class="pr-2">${todo.isImportant ? "important" : ""}</span> 
      <span class="p-2 pl-0">${todo.date ? todo.date : ""}</span>
      <span class="p-2">${todo.category ? todo.category : ""}</span>
    </div>
    `;

    const starIconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const starIconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    starIconSvg.setAttribute("fill", "none");
    starIconSvg.setAttribute("viewBox", "0 0 24 24");
    starIconSvg.setAttribute("stroke", "black");
    starIconSvg.setAttribute("stroke-width", "1.5");
    starIconSvg.classList.add("w-4", "h-4");

    starIconPath.setAttribute(
      "d",
      "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    );
    starIconPath.setAttribute("stroke-linecap", "round");
    starIconPath.setAttribute("stroke-linejoin", "round");

    starIconSvg.appendChild(starIconPath);

    const checkIconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const checkIconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    checkIconSvg.setAttribute("fill", "none");
    checkIconSvg.setAttribute("viewBox", "0 0 24 24");
    checkIconSvg.setAttribute("stroke", "black");
    checkIconSvg.setAttribute("stroke-width", "1.5");
    checkIconSvg.classList.add("w-4", "h-4", "opacity-0", "hover:opacity-100");

    checkIconPath.setAttribute(
      "d",
      "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    );
    checkIconPath.setAttribute("stroke-linecap", "round");
    checkIconPath.setAttribute("stroke-linejoin", "round");

    checkIconSvg.appendChild(checkIconPath);

    task.classList.add(
      "flex",
      "shadow",
      "items-center",
      "mt-4",
      "bg-white",
      "rounded"
    );

    task.appendChild(checkBtn);
    checkBtn.appendChild(checkIconSvg);
    task.appendChild(infoDiv);
    task.appendChild(importantBtn);
    importantBtn.appendChild(starIconSvg);
    return task;
  }
  const renderProjectTab = (name, length) => {
    const container = document.createElement("li");
    container.dataset.tabId = name;
    container.classList.add(
      "flex",
      "items-center",
      "gap-5",
      "text-sm",
      "cursor-pointer",
      "font-thin",
      "h-6",
      "hover:bg-slate-100",
      "p-5",
      "select-none"
    );
    container.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" h-6 w-8">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
  </svg>
  <span>${name}</span>
  <span id="tasksRecord" class="flex-grow text-end">${length}</span>
  
    `;
    tabBtns.appendChild(container);
    return container;
  };

  const taskUsher = (todo) => {};

  return {
    switchTab,
    renderProjectTab,
    renderForm,
    renderTask,
  };
})();

tabBtns.addEventListener("click", controller.switchTab, false);

class toDo {
  constructor(title, dueDate, category) {
    this.title = title;
    this.isImportant = true;
    this.date = dueDate ? new Date(dueDate) : "";
    this.category = category ? category : "";
    this.folder = [];
  }
}

const appLogic = (() => {
  let toDos = [];
  const addTodo = (newTodo) => {
    toDos.push(newTodo);
    console.log(toDos);
  };
  const deleteTodo = (title) => {
    toDos = toDos.filter((todo) => todo.title !== title);
  };
  const findTodo = (title) => {
    return toDos.find((todo) => todo.title === title);
  };

  const assignFolder = (todo, folder) => {
    todo.folder.push(folder);
  };
  const unassignFolder = (todo, folder) => {
    if (todo.folder.includes(folder)) {
      const index = todo.folder.indexOf(folder);
      if (index > -1) {
        todo.folder.splice(index, 1);
      }
    }
  };

  const dateFolder = (todo) => {
    if (todo.date !== "") {
      if (isToday(todo.date)) {
        assignFolder(todo, "myDay");
      }
      if (isThisWeek(todo.date)) {
        assignFolder(todo, "thisWeek");
      }
    }
    console.log(todo.date);
  };
  const importantFolder = (todo) => {
    if (todo.isImportant === false) {
      unassignFolder(todo, "important");
    } else {
      assignFolder(todo, "important");
    }
  };
  const counter = (arr, folderName) => {
    let folder = arr.filter((todo) => todo.folder.includes(folderName));
    return folder.length;
  };
  const createFolder = (name) => {
    const tabContents = document.querySelectorAll(".tabContent");

    controller.renderProjectTab(name, 0);

    let newFolder = renderTemplatePage(content, name);
    newFolder.appendChild(controller.renderForm());
    newFolder.classList.add("hidden");
  };
  const appointTask = (todo) => {
    const folderName = document.querySelector(".currentTab").id;
    assignFolder(todo, folderName);
    assignFolder(todo, "tasks");
    dateFolder(todo);
    todo.folder = [...new Set(todo.folder)];
  };

  return { appointTask, counter, createFolder, addTodo, deleteTodo, findTodo };
})();

//******************************/

const tabContents = document.querySelectorAll(".tabContent");
tabContents.forEach((tabContent) => {
  tabContent.appendChild(controller.renderForm());
  tabContent.appendChild(controller.renderTask());
  tabContent.classList.add("hidden");
  tabContent.classList.remove("currentTab");
});
myDayPage.classList.remove("hidden");
myDayPage.classList.add("currentTab");

//Event listeners
createFolderBtn.addEventListener("click", () => {
  if (newFolderName.value !== "") {
    appLogic.createFolder(newFolderName.value);
    newFolderName.value = "";
  }
});

/*
<div class="border border-blue-600 rounded-full m-4">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 opacity-0 hover:opacity-100">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
</svg> 
</div>
<div>
<span class="block font-body text-sm">${name}</span>
<div  class=" font-body font-thin text-xs">
  <!-- <span class="pr-2">project</span> -->
  <span class="p-2 pl-0">${dueDate ? dueDate : ""}</span>
  <span class="p-2">${category ? category : ""}</span>
</div>
</div>
<div class=" flex-grow flex justify-end mr-4">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blue-600">
  <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
</svg>
</div>
`;*/
