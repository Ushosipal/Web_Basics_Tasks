interface TODO {
    id: string;
    task: string;
}

// To store data
let todos: TODO[] = [];

// Targeting elements
let form = document.getElementById("form") as HTMLFormElement;
let input = document.getElementById("inputValue") as HTMLInputElement;
let list = document.getElementById("items") as HTMLUListElement;
let editId: string | null = null;

function render(todos: TODO[]) {

    list.innerHTML = "";

    for (let i = 0; i < todos.length; i++) {
        let display = todos[i];
        const li = document.createElement("li");
        li.textContent = display.task;

        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("id" , "DeleteButton");

        
        deleteBtn.addEventListener("click", () => {
            deleteTask(display.id);
        });

          const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.setAttribute("id" , "editButton");

        editBtn.addEventListener("click", () => {
            input.value = display.task;   
            editId = display.id;   
               });
                li.appendChild(editBtn);      
        li.appendChild(deleteBtn);
        list.appendChild(li);
        
    }
}
function deleteTask(id: string) {
    todos = todos.filter(todo => todo.id !== id);
    render(todos);
}

// Adding tasks
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let value = input.value.trim();  

    if (value === "") return;  
    
     if (editId !== null) {

        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === editId) {
                todos[i].task = value;   
                break;
            }
        }

        editId = null;  // Reset edit mode

    } else {
    let newTask: TODO = {
        id: Date.now().toString(),
        task: value,
    };

    todos.push(newTask);
}
    input.value = "";

    render(todos);
});