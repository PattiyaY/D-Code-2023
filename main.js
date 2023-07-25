window.addEventListener("load", () => {
  const form = document.querySelector("#task-form");
  const input = document.querySelector("#task-input");
  const list_element = document.querySelector("#tasks");
  let storedInput = JSON.parse(localStorage.getItem("textInput")) || [];

  const saveTasksToLocalStorage = () => {
    localStorage.setItem("textInput", JSON.stringify(storedInput));
  };

  const updateTaskCompletion = (taskObj, task_input, task_done) => {
    taskObj.completed = task_done.checked;
    if (taskObj.completed) {
      task_input.style.textDecoration = "line-through";
      taskObj.completed = true;
    } else {
      task_input.style.textDecoration = "none";
      taskObj.completed = false;
    }
    saveTasksToLocalStorage();
    console.log(localStorage);
  };

  const deleteTask = (taskObj, task_list) => {
    const taskIndex = storedInput.findIndex(
      (task) => task.class === taskObj.class
    );
    if (taskIndex !== -1) {
      storedInput.splice(taskIndex, 1);
      localStorage.setItem("textInput", JSON.stringify(storedInput));
      list_element.removeChild(task_list);
    }
  };

  const newTask = (task) => {
    if (!task) {
      alert("Please fill out the box.");
      return;
    }
    const taskObj = {
      text: task,
      completed: false,
      class: task,
    };
    return taskObj;
  };

  const newElement = (obj, e) => {

    //create div tasks
    const task_list = document.createElement("div");
    task_list.classList.add("tasks");

    //tasks's container.
    const input_content = document.createElement("div");
    input_content.classList.add("added-task");

    //show user's input and set it as readonly means cannot edit.
    const task_input = document.createElement("input");
    task_input.classList.add("text");
    task_input.type = "text";
    task_input.value = obj["text"];
    task_input.setAttribute("readonly", "readonly");

    //create action class
    const task_action = document.createElement("div");
    task_action.classList.add("action");

    //create checkbox for checking tasks
    const task_done = document.createElement("input");
    task_done.type = "checkbox";
    task_done.checked = obj.completed;
    task_done.setAttribute("id", "checkbox-input");

    //create Delete button for deleting tasks
    const task_del = document.createElement("button");
    task_del.classList.add("delete");
    task_del.innerHTML = "Delete";

    //task_list contains input_content inside
    task_list.appendChild(input_content);

    //input_content contains task_input inside
    input_content.appendChild(task_input);
    //console.log(task_list);

    //action class contains checkbox and delete button
    task_action.appendChild(task_done);
    task_action.appendChild(task_del);

    //task_list contains action
    task_list.appendChild(task_action);

    //list_element contains user's list
    list_element.appendChild(task_list);
    console.log(list_element);

    //set input to empty to be ready for next input
    input.value = "";

    if (obj.completed) {
      task_input.style.textDecoration = "line-through";
    } else {
      task_input.style.textDecoration = "none";
    }

    //check task
    task_done.addEventListener("click", (e) => {
      updateTaskCompletion(obj, task_input, task_done);
      saveTasksToLocalStorage();
    });

    task_del.addEventListener("click", (e) => {
      deleteTask(obj, task_list);
      saveTasksToLocalStorage();
    });

    saveTasksToLocalStorage();
  };
  

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = input.value.trim();
    //const taskClass = task.replace(/\s+/g, "-").toLowerCase();
    let obj = newTask(task);
    storedInput.push(obj);
    newElement(obj, e);
    saveTasksToLocalStorage();
    input.value = "";
  });

  if (storedInput) {
    console.log(storedInput);
    storedInput.forEach((task) => {
      //console.log(task.text);
      newElement(task);
    });
  }
});