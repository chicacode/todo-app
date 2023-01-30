console.log("UI-TODOapp")

const inputBox = document.querySelector("#search-input");
const addBtn = document.querySelector(".button-container-search button");

const deleteAllBtn = document.querySelector(".button-task-list__trash");

let taskList = [];

let taskListCopy=  [];

let newTask = {}; // By default empty; 

function addTask(event) {

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
    newTask.priority = event.target.value;
    // console.log(event.target.value); // This keyword we explain some other time
}


function showList() {
    console.log("Entra en SHOWWW")
    let listContainer = document.querySelector('.todos__app-list');
    listContainer.innerHTML = ""; /// DELETE THE PREVIOUS HTML BEFORE which was there
    for (let i = 0 ; i < taskList.length ; i++ ) {
        let listItem = document.createElement('li');

        // if (taskList[i].priority === "low") {
        //     listItem.classList.add("task-list-item")
        // }

        // [ { title: "Task 1"}, { title: "Task 2"}]

        listItem.classList.add("task-list-item")
        // {title: "Task 1"} // for index  0 , this will taskList[0]
        let pTitle = document.createElement("h5");
        // This code shows the TITLE
        pTitle.textContent = taskList[i].title;
        pTitle.classList.add("task-list-title");

        listItem.appendChild(pTitle);

        let pPriority = document.createElement('p');
        pPriority.setAttribute("id", "priority");
        pPriority.textContent = taskList[i].priority;

        // This adds the priority in the main div
        listItem.appendChild(pPriority);

        if (taskList[i].priority === "low") {
            pPriority.classList.add("task-list-priotity-low")
        }else if(taskList[i].priority === "medium"){
            pPriority.classList.add("task-list-priotity-medium")
        } else {
            pPriority.classList.add("task-list-priotity-high")
        }
        
        if(taskList[i].priority === ""){
            taskList[i].priority = "low";
        }

        // This code shows the Completion Date
        let pDate = document.createElement('p');
        pDate.setAttribute("id", taskList[i].title);
        pDate.textContent = taskList[i].completionDate;

        pDate.classList.add("task-list-date");
        listItem.appendChild(pDate);
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