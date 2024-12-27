
const formEl = document.getElementById("form");
//create icon (edit, delete, deadline)
const icons = [
    { src: './assets/icon/icons8-edit.svg', alt: 'edit' },
    { src: './assets/icon/icons8-garbage.svg', alt: 'delete' },
    { src: './assets/icon/question.svg', alt: 'confirm_deadline' },
  ];

const test = [
    {id:1,task:"wake up early",date:"12-19-2024"},
    {id:2,task:"wake up earlysss",date:"12-19-2025"}
]


// -------------------- submit event------------------------------------//

formEl.addEventListener("submit",(event)=>{
    event.preventDefault();
    try{
        const newTask = {
            task: event.target.task.value,
            date:event.target.date.value
        };
        return console.log("newTask",newTask);
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
     contentEl.innerText = list[1].task;
 
     //create task_UL
     const iconListEl = document.createElement("ul");
     iconListEl.classList.add("task__iconList");
 
     for (let i = 0; i < icons.length; i++){
         //create li
         const iconItem = document.createElement("li");
         iconItem.classList.add("task__iconItem");
 
         //create img
         const img = document.createElement("img");
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
 
     }catch(e){
     console.log("ERROR:",e);
     }
 }

createHTML(test);
