
//declaration 
const formEl = document.getElementById("form");
const tasksEL = document.querySelector(".task");
const inputEL = document.querySelector(".input__task");
const deadlineEL = document.getElementById("deadline");
const dueEl = document.querySelector(".date__due");
const deadlineImg = document.querySelector(".date__img");
const daysLeft = document.querySelector(".date__left");
const dateEl = document.querySelector(".date");
const inputSection = document.querySelector(".input");
const html = document.querySelector(".html");

let currentEditId = null;

//detect device
const clickEventType = (( window.ontouchstart!== null ) ? 'click':'touchend');



//create icon (edit, delete, deadline)
const icons = [
    { src: './assets/icon/icons8-edit.svg', alt: 'edit', class:'task__edit'},
    { src: './assets/icon/icons8-garbage.svg', alt: 'delete' , class:'task__delete'},
    { src: './assets/icon/question.svg', alt: 'confirm_deadline', class:'task__deadline'},
  ];

// -------------------- renderTasks(when page is loaded)------------------------------------//

window.addEventListener("load",()=>{
    renderTasks();
    iconOption();
    


})





// -------------------- submit event(new)------------------------------------//

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    try{
        if(currentEditId !== null){
            //move to new function
            editSubmit(event);
        }else{
            const taskId = setTaskId();
            const newTask = {
                id:taskId,
                task: event.target.task.value,
                date:event.target.date.value
            };
            
            //test
            const result = createHTML(newTask);
            tasksEL.prepend(result);

            //set newTask into list
            saveLocalStorage(newTask);

            //render option
            iconOption();

            inputSection.classList.add("hidden_input");

            //clear form
            event.target.task.value = "";
            event.target.date.value = "";
        }
    }catch(e){
        console.log("ERROR:",e);
    }
});


// -------------------- submit event(edit)------------------------------------//


function editSubmit(event){
    try{
        //fetch data from local storage
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks =  taskList.map((task) => {
            if(task.id == currentEditId){
                return {
                    ...task,
                    id:parseInt(currentEditId),
                    task: event.target.task.value,
                    date:event.target.date.value
                };
            }
            //leave other data unchanged
            return task;  
        });

        localStorage.setItem("tasks",JSON.stringify(updatedTasks));
        //render tasklist from local
        renderTasks();
        iconOption();
        inputSection.classList.add("hidden_input");
        
        //clear form
        event.target.task.value = "";
        event.target.date.value = "";

    }catch(e){
        console.log("ERROR:",e);
    }
}

// -------------------- HTML structure------------------------------------//

function createHTML(list){
    try {
     //create task__item 
     const taskEl = document.createElement("div");
     taskEl.id = list.id;
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
    const task = JSON.parse(localStorage.getItem("tasks")) || [];
    //push new task into taskList
    task.unshift(newTask);
    localStorage.setItem("tasks",JSON.stringify(task));
}

// -------------------- set task Id for local storage------------------------------------//

const  setTaskId = () =>{
    //confirm current task first 
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    if(tasks.length !== 0){
        //find maxId
        const maxId = Math.max(...tasks.map(task => task.id));
        return maxId + 1;
    }else{
        return 1;
    }
}


// -------------------- render data from local storage------------------------------------//

const renderTasks = () => {
    tasksEL.innerText = "";
    const taskAll = JSON.parse(localStorage.getItem("tasks"));
    if(taskAll !== null){
    taskAll.forEach((task) => {
        const result = createHTML(task);
        tasksEL.appendChild(result);
    });
    }
}


// --------------------icon option------------------------------------//


const iconOption =()=>{
    const completeELs = document.querySelectorAll(".task__check");
    const editELs = document.querySelectorAll(".task__edit");
    const deleteEls = document.querySelectorAll(".task__delete");
    const deadlineEls = document.querySelectorAll(".task__deadline");

    //delete ::afters
    removeBackground();

    //completion
    completeELs.forEach(completeEL=>{
        completeEL.addEventListener(clickEventType,(e)=>{
        const completeTarget = e.target.closest(".task__item");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        const completeId = completeTarget.id;
        
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
            scalar: 0.8,
        });

        //delete local storage
        const updatedTasks = taskList.filter(task => {
            completeId !== task.id;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        //remove HTML
        setTimeout(()=>{
        completeTarget.remove();
        },200);
    })
});

    //edit
    editELs.forEach(editEl =>{
        editEl.addEventListener(clickEventType, (e)=>{
        //show input
        inputSection.classList.remove("hidden_input");
        addBackground();
        const editTarget = e.target.closest(".task__item");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        const editId = editTarget.id;
        const targetTask = taskList.filter(task => task.id == editId);
        inputEL.value = targetTask[0].task;
        deadlineEL.value = targetTask[0].date;
        currentEditId = editId;
        });
    });


    //delete
    deleteEls.forEach(deleteEL=>{
        deleteEL.addEventListener(clickEventType,(e)=>{
        const deleteTarget = e.target.closest(".task__item");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        const deleteId = deleteTarget.id;
        
        //delete local storage
        const updatedTasks = taskList.filter(task => {
            deleteId !== task.id;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        //remove HTML
        deleteTarget.remove();
    })
    });
    //deadline
    deadlineEls.forEach(deadlineEL => {
        deadlineEL.addEventListener(clickEventType,(e)=>{
        dateEl.classList.remove("popout");
        const deadlineTarget = e.target.closest(".task__item");
        const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
        const deadlineId = deadlineTarget.id;
        const targetTask = taskList.filter(task => task.id == deadlineId);
        dueEl.innerText = "Due Date: " + targetTask[0].date;
        
        //calculate //
        const targetDate = new Date(targetTask[0].date);    
        //today
        const currentDate = new Date();
    
        const diffInMs = targetDate - currentDate ;
        // Convert milliseconds to days
        let diffInDays = Math.round(diffInMs / (24 * 60 * 60 * 1000));
        // Check if the difference is greater than 7 days
        if (diffInDays >= 5) {
            deadlineImg.src = "../assets/img/Phase_1.png";

        }else if(diffInDays >=  2){
            deadlineImg.src = "../assets/img/Phase_2.png";
        
        }else if(diffInDays >= 1){
            deadlineImg.src = "../assets/img/Phase_3.png";
        
        }else if(diffInDays <= 0 ){
            deadlineImg.src = "../assets/img//Phase_6.png";
            diffInDays= Math.abs(diffInDays)
            daysLeft.innerText = diffInDays + " days over";
            return;
        }
        daysLeft.innerText = diffInDays + " days left";
        }
    )
})
    //close tab
    const closeEl = document.querySelector(".date__delete");
    closeEl.addEventListener(clickEventType, e =>{
        const tab = closeEl.closest(".date");
        tab.classList.add("popout");
    })

    //add task
    const openEl = document.querySelector(".addTask__button");
    openEl.addEventListener(clickEventType,e=>{
        inputSection.classList.remove("hidden_input");
        addBackground();

    })

}

const  addBackground = ()=>{
    html.classList.add("html");
}


const removeBackground = ()=>{
    html.classList.remove("html");
}
