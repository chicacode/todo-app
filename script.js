console.log("UI-TODOapp")

const inputBox = document.querySelector("#search-input");
const addBtn = document.querySelector(".button-container-search button");

const deleteAllBtn = document.querySelector(".button-task-list__trash");

let taskList = [];

let taskListCopy=  []; // 

let newTask = {}; // By default empty; 

// console.log("search", inputBox.value);

// console.log("button", addBtn.value);

// console.log("list", todoList);

// console.log("trash", deleteAllBtn.value);


function addTask(event) {

    console.log(event)
    let taskItem = document.querySelector("#task-item");
    event.preventDefault();

    if (taskItem.value.length > 0) {
        newTask.title = taskItem.value;

        let modifiedTask =  JSON.parse(JSON.stringify(newTask)) // DEEP COPY
        // We are creating a new object with a new memory
 
        taskList.push(modifiedTask);
        taskListCopy = JSON.parse(JSON.stringify(taskList));
        taskItem.value = "";
        console.log(taskList);
    
        showList();
    } else {
        alert("Please enter a value, to add!");
    }
}

function selectPriority(event) {
    // newTask = {} , newtask = { priority: "high"}
    newTask.priority = event.target.value;
    // console.log(event.target.value); // This keyword we explain some other time
}


function showList() {
    let listContainer = document.querySelector('.todos__app-list');
    listContainer.innerHTML = ""; /// DELETE THE PREVIOUS HTML BEFORE which was there
    for (let i = 0 ; i < taskList.length ; i++ ) {
        let listItem = document.createElement('li');

        if (taskList[i].priority === "low") {
            listItem.style.background = "#118ab2";
            listItem.style.color = "black";
        }

        // [ { title: "Task 1"}, { title: "Task 2"}]


        // {title: "Task 1"} // for index  0 , this will taskList[0]
        let pTitle = document.createElement("p");

        // This code shows the TITLE
        pTitle.textContent = taskList[i].title;
        pTitle.style.fontSize = "24px";
        pTitle.style.margin = "2px";
        pTitle.style.fontWeight = "bold";
        pTitle.style.color = "black";

        listItem.appendChild(pTitle);

        let pPriority = document.createElement('p');
        pPriority.setAttribute("id", "priority");
        pPriority.textContent = taskList[i].priority;

        // This adds the priority in the main div
        listItem.appendChild(pPriority);

        if (taskList[i].priority === "low") {
            pPriority.style.backgroundColor = "yellow";
        } else {
            pPriority.style.backgroundColor = "red";
        }
        

        // This code shows the Completion Date
        let p = document.createElement('p');
        p.setAttribute("id", taskList[i].title);
        p.textContent = taskList[i].completionDate;

        listItem.appendChild(p);
        listContainer.appendChild(listItem);
    }
}

function setDate(event) {
    newTask.completionDate = event.target.value;
}


function searchTasks() {
    let searchKeyword= document.getElementById('search-input');
    console.log(searchKeyword.value);

    taskList = taskListCopy; // Revise the taskList to the orignal Array

    let modifiedTaskList = taskList.filter((task) => {
        if (task.title.includes(searchKeyword.value)) {
            return true;
        }
    })

    taskList = modifiedTaskList;

    showList();
}