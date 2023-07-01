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
const navbar = document.querySelector(".navBar");
const hamburger = document.querySelector(".hamburger");

const myDayPage = myDay(content);
const tasksPage = renderTasksPage(content);
const importantPage = renderImportantPage(content);
const weekPage = renderWeekPage(content);
const templatePage = renderTemplatePage(content, "learn React");

const options = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

myDayPage.classList.add("currentTab");

hamburger.addEventListener("click", () => {
  navbar.classList.remove("hidden");
});

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
    navbar.classList.add("hidden");
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

    blueFlag.dataset.color = "blue";
    yellowFlag.dataset.color = "yellow";
    redFlag.dataset.color = "red";

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
    /*formButtons.appendChild(flagDiv);
    flagDiv.appendChild(blueFlag);
    flagDiv.appendChild(yellowFlag);
    flagDiv.appendChild(redFlag);*/
    formButtons.appendChild(importantBtn);
    formButtons.appendChild(btnDiv);
    btnDiv.appendChild(addTaskBtn);
    addTaskBtn.textContent = "Add";

    /****** EVENT LISTENERS */

    let clicked = importantBtn;
    importantBtn.addEventListener("click", (e) => {
      clicked = e.target.closest("svg");
      importantBtn.classList.toggle("selected");

      if (importantBtn.classList.contains("selected")) {
        importantBtn.dataset.isImportant = true;
        clicked.setAttribute("fill", "black");
      } else {
        importantBtn.dataset.isImportant = false;
        clicked.setAttribute("fill", "none");
      }
    });

    addTaskBtn.addEventListener("click", () => {
      const openTab = document.querySelector(".currentTab").id;
      if (nameInput.value !== "") {
        if (openTab === "myDay" || openTab === "thisWeek") {
          if (dueDateBtn.value === "") {
            dueDateBtn.value = format(new Date(), "yyyy-MM-dd");
          }
        }

        let newTodo = new toDo(nameInput.value, dueDateBtn.value, Date.now());
        if (importantBtn.dataset.isImportant) {
          newTodo.isImportant = true;
        }
        if (importantBtn.dataset.isImportant === "false") {
          newTodo.isImportant = false;
        }
        appLogic.appointTask(newTodo);
        appLogic.addTodo(newTodo);
        appLogic.updateTodo();

        nameInput.value = "";
        dueDateBtn.value = "";
      } else {
        console.log("fill it up");
        alert("fill it up");
      }
      importantBtn.dataset.isImportant = false;
      clicked.setAttribute("fill", "none");
    });

    return form;
  }

  function renderTask(todo) {
    const task = document.createElement("div");
    const checkBtn = document.createElement("div");
    const importantBtn = document.createElement("div");
    const infoDiv = document.createElement("div");
    const deleteBtn = document.createElement("div");
    const todoCode = document.createElement("span");
    task.appendChild(todoCode);
    todoCode.classList.add("hidden");

    todoCode.dataset.pin = todo.code;

    checkBtn.classList.add(
      "border",
      "border-blue-600",
      "rounded-full",
      "m-4",
      "cursor-pointer"
    );
    importantBtn.classList.add("flex-grow", "flex", "justify-end", "mr-4");
    deleteBtn.classList.add("text-red-600", "mr-4", "cursor-pointer");

    let date = new Date(Date.parse(todo.date));

    infoDiv.innerHTML = `
    <span class="block font-body text-sm">${todo.title}</span>
    <div  class=" font-body font-thin text-xs">
      <span class="pr-2">${
        todo.isImportant ? "important" : "unimportant"
      }</span> 
      <span class="p-2 pl-0">${
        todo.date ? date.toLocaleString("en", options) : "not planned"
      }</span>
      <span class="p-2">${todo.category ? todo.category : ""}</span>
    </div>
    `;
    deleteBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

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
    if (todo.isImportant === true) {
      starIconSvg.setAttribute("fill", "black");
    }
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
    if (todo.isCompleted === true) {
      checkIconSvg.classList.add("opacity-100");
      task.classList.add("bg-slate-300", "line-through");
    }
    checkIconPath.setAttribute("d", "M4.5 12.75l6 6 9-13.5");
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
    task.appendChild(deleteBtn);

    /***EVENT LISTENERS *****/
    deleteBtn.addEventListener("click", (e) => {
      let clicked = e.target.closest("div");
      let todoCode = clicked.parentNode.firstChild.dataset.pin;
      appLogic.deleteTodo(todoCode);
      appLogic.updateTodo();
    });

    starIconSvg.addEventListener("click", (e) => {
      let clicked = e.target.closest("svg");
      let todoCode = importantBtn.parentNode.firstChild.dataset.pin;
      let foundTodo = appLogic.findTodo(todoCode);

      if (foundTodo.isImportant === false) {
        foundTodo.isImportant = true;

        clicked.setAttribute("fill", "black");
      } else {
        foundTodo.isImportant = false;
        clicked.setAttribute("fill", "none");
      }
      appLogic.appointTask(foundTodo);
      appLogic.saveTodo();
      appLogic.updateTodo();
    });
    checkBtn.addEventListener("click", () => {
      let todoCode = checkBtn.parentNode.firstChild.dataset.pin;
      let foundTodo = appLogic.findTodo(todoCode);

      if (foundTodo.isCompleted === false) {
        foundTodo.isCompleted = true;
      } else {
        foundTodo.isCompleted = false;
      }
      appLogic.saveTodo();
      appLogic.updateTodo();
    });
    return task;
  }
  const renderProjectTab = (project) => {
    const container = document.createElement("li");
    const tasksRecord = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const projectCode = document.createElement("span");
    const icon = document.createElement("div");
    const projectName = document.createElement("span");
    projectCode.classList.add("hidden");
    deleteBtn.classList.add(
      "absolute",
      "right-0",
      "md:opacity-0",
      "group-hover:md:opacity-100"
    );
    tasksRecord.classList.add("flex-grow", "text-end");
    tasksRecord.setAttribute("id", "tasksRecord");

    projectCode.dataset.pin = project.code;
    container.dataset.tabId = project.name;
    projectName.textContent = project.name;
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
      "select-none",
      "dark:hover:bg-slate-700",
      "dark:text-white",
      "created",
      "relative",
      "group"
    );
    container.appendChild(projectCode);

    icon.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" class="h-6 w-8 " fill="white"><path d="M149.825-280Q137-280 128.5-288.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137-450 128.5-458.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5Zm0-170Q137-620 128.5-628.675q-8.5-8.676-8.5-21.5 0-12.825 8.675-21.325 8.676-8.5 21.5-8.5 12.825 0 21.325 8.675 8.5 8.676 8.5 21.5 0 12.825-8.675 21.325-8.676 8.5-21.5 8.5ZM290-280v-60h550v60H290Zm0-170v-60h550v60H290Zm0-170v-60h550v60H290Z"/></svg>
    `;
    deleteBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48" class="h-3 w-3 " fill="white"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
      `;
    container.appendChild(icon);
    container.appendChild(projectName);
    container.appendChild(deleteBtn);
    container.appendChild(tasksRecord);
    tabBtns.appendChild(container);

    deleteBtn.addEventListener("click", (e) => {
      let clicked = e.target.closest("button");
      let projectCode = clicked.parentNode.firstChild.dataset.pin;
      console.log(projectCode);
      appLogic.deleteProject(projectCode);
      appLogic.updateProject();
    });

    return container;
  };
  const createTasksDiv = () => {
    const tasksDiv = document.createElement("div");
    return tasksDiv;
  };

  return {
    switchTab,
    renderProjectTab,
    renderForm,
    renderTask,
    createTasksDiv,
  };
})();

tabBtns.addEventListener("click", controller.switchTab, false);

class toDo {
  constructor(title, dueDate, code) {
    this.title = title ? title : "";
    this.isImportant = false;
    this.date = dueDate ? new Date(Date.parse(dueDate)) : "";
    this.code = code.toString();
    this.folder = [];
    this.isCompleted = false;
  }
}

class Project {
  constructor(name, code) {
    this.name = name;
    this.code = code.toString();
  }
}

const appLogic = (() => {
  let toDos = [];
  let Projects = [];

  const addTodo = (newTodo) => {
    toDos = getTaskFromStorage() ? getTaskFromStorage() : [];
    toDos.push(newTodo);
    saveTaskToStorage(toDos);
    console.log(toDos);
  };
  const deleteTodo = (code) => {
    toDos = getTaskFromStorage() ? getTaskFromStorage() : [];
    toDos = toDos.filter((todo) => todo.code !== code);
    saveTaskToStorage(toDos);
    console.log(toDos);
  };
  const findTodo = (code) => {
    toDos = getTaskFromStorage() ? getTaskFromStorage() : [];
    return toDos.find((todo) => todo.code === code);
  };
  const addProject = (newProject) => {
    Projects = getFolderFromStorage() ? getFolderFromStorage() : [];
    Projects.push(newProject);
    saveFolderToStorage(Projects);
    console.log(Projects);
  };
  const deleteProject = (code) => {
    Projects = getFolderFromStorage() ? getFolderFromStorage() : [];
    Projects = Projects.filter((Project) => Project.code !== code);
    saveFolderToStorage(Projects);
    console.log(Projects);
  };
  const findProject = (code) => {
    return Projects.find((project) => project.code === code);
  };
  const assignTaskToFolder = (todo, folder) => {
    todo.folder.push(folder);
  };
  const unassignTaskToFolder = (todo, folder) => {
    if (todo.folder.includes(folder)) {
      const index = todo.folder.indexOf(folder);
      if (index > -1) {
        todo.folder.splice(index, 1);
      }
    }
  };

  const addTodoToDateFolder = (todo) => {
    let date = new Date(Date.parse(todo.date));
    if (date !== "") {
      if (isToday(date)) {
        assignTaskToFolder(todo, "myDay");
      }
      if (isThisWeek(date)) {
        assignTaskToFolder(todo, "thisWeek");
      }
    }
  };
  const addTodoToImportantFolder = (todo) => {
    if (todo.isImportant === false) {
      unassignTaskToFolder(todo, "important");
    } else {
      assignTaskToFolder(todo, "important");
    }
  };
  const makeTodoCompleted = (todo) => {
    if (todo.isCompleted === false) {
      unassignTaskToFolder(todo, "Completed");
    } else {
      assignTaskToFolder(todo, "completed");
    }
  };
  const counter = (folderName) => {
    let TODO = getTaskFromStorage();
    if (TODO) {
      let folder = TODO.filter((todo) => todo.folder.includes(folderName));
      return folder.length;
    }
  };
  const cleanAllCreatedProject = () => {
    const projects = document.querySelectorAll(".created");
    const tabContents = document.querySelectorAll(".tabContent");
    tabContents.forEach((tab) => {
      projects.forEach((project) => {
        if (tab.id === project.dataset.tabId) {
          tab.remove();
        }
      });
    });
    projects.forEach((project) => {
      project.remove();
    });
  };
  const updateProject = () => {
    let PROJECTS = getFolderFromStorage();
    if (PROJECTS) {
      cleanAllCreatedProject();
      for (let project of PROJECTS) {
        controller.renderProjectTab(project);
        let newFolder = renderTemplatePage(content, project);
        newFolder.appendChild(controller.renderForm());
        newFolder.appendChild(controller.createTasksDiv());
        newFolder.classList.add("hidden");
      }
    }
    amount();
  };

  const createFolder = (name) => {
    let newProject = new Project(name, Date.now());
    addProject(newProject);
    amount();
    updateProject();
  };
  const appointTask = (todo) => {
    const folderName = document.querySelector(".currentTab").id;
    if (folderName === "important") {
      todo.isImportant = true;
    }
    assignTaskToFolder(todo, "tasks");
    addTodoToDateFolder(todo);
    addTodoToImportantFolder(todo);
    makeTodoCompleted(todo);
    if (folderName !== "myDay" && folderName !== "thisWeek") {
      assignTaskToFolder(todo, folderName);
    }
    todo.folder = [...new Set(todo.folder)];
  };
  const taskUsher = (todo) => {
    const tabContents = document.querySelectorAll(".tabContent");
    todo.folder.forEach((folder) => {
      tabContents.forEach((tab) => {
        if (tab.id === folder) {
          tab.lastChild.appendChild(controller.renderTask(todo));
          amount();
        }
      });
    });
  };
  const cleanTodoContainer = () => {
    const tabContents = document.querySelectorAll(".tabContent");
    tabContents.forEach((tab) => {
      tab.lastChild.innerHTML = "";
    });
  };

  const amount = () => {
    const tabButtons = document.querySelectorAll("[data-tab-id]");
    tabButtons.forEach((btn) => {
      let amount = counter(btn.dataset.tabId);
      btn.lastChild.textContent = amount;
      amount = 0;
    });
  };

  const updateTodo = () => {
    let TODO = getTaskFromStorage();
    if (TODO) {
      console.log(TODO);
      cleanTodoContainer();
      for (let todo of TODO) {
        taskUsher(todo);
      }
      amount();
    }
  };

  const saveTodo = () => {
    saveTaskToStorage(toDos);
  };

  function saveTaskToStorage(todo) {
    window.localStorage.setItem(`ToDos`, JSON.stringify(todo));
  }
  function getTaskFromStorage() {
    let Todo = JSON.parse(window.localStorage.getItem("ToDos"));
    return Todo;
  }
  function saveFolderToStorage(todo) {
    window.localStorage.setItem(`Project`, JSON.stringify(todo));
  }
  function getFolderFromStorage() {
    let Todo = JSON.parse(window.localStorage.getItem("Project"));
    return Todo;
  }

  return {
    appointTask,
    counter,
    createFolder,
    addTodo,
    deleteTodo,
    findTodo,
    amount,
    updateTodo,
    updateProject,
    deleteProject,
    makeTodoCompleted,
    saveTodo,
  };
})();

//******************************/

const tabContents = document.querySelectorAll(".tabContent");
tabContents.forEach((tabContent) => {
  tabContent.appendChild(controller.renderForm());
  tabContent.appendChild(controller.createTasksDiv());
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
appLogic.amount();
appLogic.updateTodo();
appLogic.updateProject();
