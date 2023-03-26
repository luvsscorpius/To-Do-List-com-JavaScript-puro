// Seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");

let oldInputValue;

// Funções

const saveTodo = (text) => {
    const todo = document.createElement("div") //cria uma div
    todo.classList.add("todo") // cria a div externa

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = text // recebe o texto da função savetodo que recebe pelo valor todoInput
    todo.appendChild(todoTitle) // appendchild insere um novo nó na estrutura do DOM de um documento

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-todo")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todo.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-todo")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todo.appendChild(editBtn)

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("remove-todo")
    deleteBtn.innerHTML = ' <i class="fa-solid fa-xmark"></i>'
    todo.appendChild(deleteBtn)

    todoList.appendChild(todo)

    todoInput.value = "" // Depois de digitar ele limpa o input
    todoInput.focus() // foca novamente no input
}

const toggleForms = () => {
    editForm.classList.toggle("hide")
    todoForm.classList.toggle("hide")
    todoList.classList.toggle("hide") //quando clica em editar ele só ve a edição
}

const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
        }
    })
}



// Eventos

todoForm.addEventListener("submit", (e) => {

    e.preventDefault() // faz com que o formulário não seja enviado quando clicar no botão

    const inputValue = todoInput.value

    if (inputValue) {
        saveTodo(inputValue)
    }
})

// evento pra saber em qual botão está clicando

document.addEventListener("click", (e) => {

    const targetEl = e.target
    const parentEL = targetEl.closest("div") // seleciona a div mais proxima
    let todoTitle;

    if (parentEL && parentEL.querySelector("h3")) {
        todoTitle = parentEL.querySelector("h3").innerText
    }

    if (targetEl.classList.contains("finish-todo")) {
        parentEL.classList.toggle("done") // add adiciona a class done para os to do que voce seleciona
        // Toggle faz o inverso se tem ele tira e se não tem ele coloca
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEL.remove() // remove o elemento pai
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms();

        editInput.value = todoTitle
        oldInputValue = todoTitle
    }
})

cancelEditBtn.addEventListener("click", (e) => {

    e.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const editInputValue = editInput.value

    if (editInputValue) {
        // atualizar
        updateTodo(editInputValue)
    }

    toggleForms();
})