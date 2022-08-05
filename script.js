const createDefaultToDoList = function () {

    if (localStorage.length === 0) {

        let storeToDoList = [
            {
                uid: "1",
                text: "Email David",
                isDone: false
            },
            {
                uid: "2",
                text: "Create ideal user personal guide",
                isDone: false
            },
            {
                uid: "3",
                text: "Set up A/B test",
                isDone: false
            }
        ];

        for (let i = 0; i < storeToDoList.length; i++) {

            const taskList = document.getElementById("task-list");

            let newTaskListItem = cloneTask();

            let taskText = newTaskListItem.querySelector(".task");
            taskText.innerText = storeToDoList[i].text;

            deleteTask(newTaskListItem);
            changeTask(newTaskListItem);

            taskList.appendChild(newTaskListItem);

            localStorage.setItem(storeToDoList[i].uid, JSON.stringify(storeToDoList[i]));
        }
    }
};

const getToDoList = function () {

    let keys = Object.keys(localStorage);

    if (keys.length === 0) {createDefaultToDoList()}

    const taskList = document.getElementById("task-list");

    for (let i = 0; i < keys.length; i++) {
        let newTaskListItem = cloneTask();
        let storeTask = JSON.parse(localStorage.getItem(keys[i]));

        let taskText = newTaskListItem.querySelector(".task");
        taskText.innerText = storeTask.text;
        newTaskListItem.dataset.uid = storeTask.uid;

        if (storeTask.isDone) {
            taskText.classList.add("task-done");
            newTaskListItem.querySelector("input").checked = true;
        }

        deleteTask(newTaskListItem);
        changeTask(newTaskListItem);
        taskList.appendChild(newTaskListItem);
    }
}

const deleteTask = function (item) {
    let deleteBtn = item.querySelector(".delete-btn");

    deleteBtn.addEventListener('click', function () {
        localStorage.removeItem(item.dataset.uid);
        item.remove();
    });
};

const changeTask = function (item) {
    let checkbox = item.querySelector("input");
    let task = item.querySelector(".task");

    checkbox.addEventListener('change', function () {
        let storeTask = JSON.parse(localStorage.getItem(item.dataset.uid));

        if (storeTask.isDone === false) {
            storeTask.isDone = true;
            task.classList.toggle("task-done");
            localStorage.removeItem(item.dataset.uid);
            localStorage.setItem(item.dataset.uid, JSON.stringify(storeTask));
        } else {
            storeTask.isDone = false;
            task.classList.toggle("task-done");
            localStorage.removeItem(item.dataset.uid);
            localStorage.setItem(item.dataset.uid, JSON.stringify(storeTask));
        }
    });
};

const cloneTask = function () {
    let template = document.querySelector('#task-template').content;
    let newTaskListItem = template.querySelector('li');
    return newTaskListItem.cloneNode(true);
};

const generateUid = function () {
    let uid = Math.random() * 100000;
    return Math.round(uid);
}

getToDoList();

const  todoListForm = document.getElementById("todo-list-form");

todoListForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const inputTask = document.getElementById("input-task");
    const taskList = document.getElementById("task-list");

    let newTaskListItem = cloneTask();

    let taskText = newTaskListItem.querySelector(".task");
    taskText.innerText = inputTask.value;

    const newTaskListItemUid = newTaskListItem.dataset.uid = String(generateUid());

    let storeItem = {
        uid: newTaskListItemUid.toString(),
        text: inputTask.value.toString(),
        isDone: false
    }

    deleteTask(newTaskListItem);
    changeTask(newTaskListItem);

    localStorage.setItem(newTaskListItemUid.toString(), JSON.stringify(storeItem));

    taskList.appendChild(newTaskListItem);
    inputTask.value = "";
});