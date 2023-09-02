let form=document.getElementById("form");
let textinput=document.getElementById("textinput");
let msg=document.getElementById("msg");
let textarea=document.getElementById("textarea");
let dateinput=document.getElementById("dateinput");
let tasks=document.getElementById("tasks");
let add=document.getElementById("add");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    formvalidation();
});

let formvalidation = () =>{
    if(textinput.value ===""){
        console.log("Failure");
        msg.innerHTML="Task cannot be blank";
    }
    else{
        console.log("Success");
        msg.innerHTML="";
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        
        (()=>{
            add.setAttribute("data-bs-dismiss","modal");
        })();
    }
};

let data = [];
let acceptData =() => {
    data.push({
        text : textinput.value,
        date : dateinput.value,
        description : textarea.value,

    });

    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
    createTasks();
};


let createTasks = () =>{
    tasks.innerHTML="";

    data.map((x,y)=>{
        return (tasks.innerHTML +=`
        <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
                <i onclick="deleteTask(this); createTasks()" class="fa-solid fa-trash"></i>
            </span>
        </div>`
        );
    });
    
    
    resetform();

};

let deleteTask = (e)=>{
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id,1);
    localStorage.setItem("data",JSON.stringify(data));
    console.log(e.parentElement.parentElement.id);
};

let editTask = (e)=>{
    let selectedTask = e.parentElement.parentElement;
    textinput.value=selectedTask.children[0].innerHTML;  
    dateinput.value=selectedTask.children[1].innerHTML;
    textarea.value=selectedTask.children[2].innerHTML;
    deleteTask(e);
};

let resetform = (e) =>{
    textinput.value="";  
    dateinput.value="";
    textarea.value="";

;}


(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})();