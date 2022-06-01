"use strict";
exports.__esModule = true;
var uuid_1 = require("uuid");
var list = document.querySelector("#list");
var form = document.getElementById("new-task-form");
var input = document.querySelector("#new-task-title");
var tasks = loadTasks();
tasks.forEach(addListItem);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    if ((input === null || input === void 0 ? void 0 : input.value) == "" || (input === null || input === void 0 ? void 0 : input.value) == null)
        return;
    var newTask = {
        id: (0, uuid_1.v4)(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask); // if you try push eny type well get error  becouse we extent type from Task 
    saveTasks();
    addListItem(newTask);
    input.value = "";
});
function addListItem(task) {
    var item = document.createElement("li");
    var btnDel = document.createElement("button");
    var label = document.createElement("label");
    var checkbox = document.createElement("input");
    var btnDelet = document.querySelectorAll(".delet");
    checkbox.addEventListener("change", function () {
        task.completed = checkbox.checked;
        saveTasks();
    });
    btnDel.classList.add("delet");
    btnDel.innerHTML = "x";
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    label.append(checkbox, task.title); //Element.append() allow you to also append string object  
    item.append(btnDel);
    item.append(label);
    list === null || list === void 0 ? void 0 : list.append(item);
}
function saveTasks() {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
}
function loadTasks() {
    var taskJSON = localStorage.getItem("TASKS");
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}
