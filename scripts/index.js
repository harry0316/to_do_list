
//declaration 
const formEl = document.getElementById("form");
const tasksEL = document.querySelector(".task");

//create icon (edit, delete, deadline)
const icons = [
    { src: './assets/icon/icons8-edit.svg', alt: 'edit', class:'task__edit'},
    { src: './assets/icon/icons8-garbage.svg', alt: 'delete' , class:'task__delete'},
    { src: './assets/icon/question.svg', alt: 'confirm_deadline', class:'task__deadline'},
  ];

// -------------------- renderTasks(when page is loaded)------------------------------------//

window.addEventListener("load",()=>{
    renderTasks();
})





// -------------------- submit event------------------------------------//

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    try{
        const newTask = {
            task: event.target.task.value,
            date:event.target.date.value
        };
        
        //test
        const result = createHTML(newTask);
        tasksEL.prepend(result);

        //set newTask into list
        saveLocalStorage(newTask);
        
        //clear form
        event.target.task.value = "";
        event.target.date.value = "";

    }catch(e){
        console.log("ERROR:",e);
    }
});

// -------------------- HTML structure------------------------------------//

function createHTML(list){
    try {
     //create task__item 
     const taskEl = document.createElement("div");
     taskEl.classList.add("task__item");
 
     //create task__check
     const checkEl = document.createElement("div");
     checkEl.classList.add("task__check");
 
     //create task
     const contentEl = document.createElement("p");
     contentEl.classList.add("task__content");
     contentEl.innerText = list.task;
 
     //create task_UL
     const iconListEl = document.createElement("ul");
     iconListEl.classList.add("task__iconList");
 
     for (let i = 0; i < icons.length; i++){
         //create li
         const iconItem = document.createElement("li");
         iconItem.classList.add("task__iconItem");
 
         //create img
         const img = document.createElement("img");
         img.classList.add(icons[i].class);
         img.src = icons[i].src;
         img.alt = icons[i].alt;
         
 
         //append
         iconItem.appendChild(img);
         iconListEl.appendChild(iconItem);
 
 
         //append all of them into item
         taskEl.appendChild(checkEl);
         taskEl.appendChild(contentEl);
         taskEl.appendChild(iconListEl);
     }
     return taskEl;

     }catch(e){
     console.log("ERROR:",e);
     }
 }


// -------------------- store local storage------------------------------------//

const saveLocalStorage = (newTask) =>{
    //pull previous tasks || [] ==> if there are no data => create empty array
    localStorage.removeItem("tasks");
    const task = JSON.parse(localStorage.getItem("tasks")) || [];
    //push new task into taskList
    task.unshift(newTask);
    localStorage.setItem("tasks",JSON.stringify(task));
}

// -------------------- render data from local storage------------------------------------//

const renderTasks = () => {
    tasksEL.innerText = "";
    const taskAll = JSON.parse(localStorage.getItem("tasks"));
    if(taskAll.length != 0){
    taskAll.forEach((task) => {
        const result = createHTML(task);
        tasksEL.appendChild(result);
    });
    }
}


// --------------------icon option------------------------------------//


const iconOption = ()=>{
    const completeELs = document.querySelectorAll(".task__check");
    const editELs = document.querySelectorAll(".task__edit");
    const deleteEls = document.querySelectorAll(".task__delete");
    const deadlineEls = document.querySelectorAll(".task__deadline");

    //completion
    completeEL.forEach(()=>{

    });



}