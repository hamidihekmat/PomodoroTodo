
class TodoApp {
    constructor() {
        this.myStorage = window.localStorage;
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos.forEach(item => {
            this.createTodo(item);
        });

        
    };

    appUpdater() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    };
    
    addTodo(todo) {
        this.appUpdater();
        todo.name = `todo${this.todos.length + 1}`;
        this.complete = todo.complete;
        this.todos.push(todo);
        this.myStorage.setItem('todos', JSON.stringify(this.todos));
        this.createTodo(todo);
    };

    createTodo(todo) {
        // create todo div
        const todoItemDiv = document.createElement('div');
        todoItemDiv.classList.add('todo')
        todoItemDiv.classList.add(todo.name);
        if (todo.complete) {
            todoItemDiv.classList.add('todo-complete');
        }
        // create todo item
        const todoItem = document.createElement('li');
        todoItem.classList.add('todo-item');
        todoItem.innerText = todo.content;
        // create complete button
        const completeButton = document.createElement('button');
        completeButton.classList.add('complete-btn');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        const trashButton  = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoItemDiv.appendChild(todoItem);
        todoItemDiv.appendChild(completeButton);
        todoItemDiv.appendChild(trashButton);
        // display todo item
        todosDiv.appendChild(todoItemDiv);
    };

    removeTodo(name) {
        this.todos = this.todos.filter(item => {
            return item.name != name;
        });
        this.myStorage.setItem('todos', JSON.stringify(this.todos));
    };

    toggleComplete(name) {
        this.todos.forEach(item => {
            if (item.name == name) {
                if (item.complete) {
                    item.complete = false
                }
                else {
                    item.complete = true;
                }
            }
            this.myStorage.setItem('todos', JSON.stringify(this.todos));
        });
    }

};




// Selector
const todoInput = document.querySelector('.todo-input');
const submit = document.querySelector('.add-todo');
const todosDiv = document.querySelector('.todos');


// App
const app = new TodoApp();


// Events
const addingTodo = () => {
    submit.addEventListener('click', (event) => {
        event.preventDefault();
        if (todoInput.value) {
            let todo = {'content' : `${todoInput.value}`, 'completed': false};
            app.addTodo(todo);
            todoInput.value = '';
        }
    });
};

const completeTodo = () => {
    todosDiv.addEventListener('click', (event) => {
        if (event.target.classList[0] == 'complete-btn') {
            const todo = event.target.parentElement;
            app.toggleComplete(todo.classList[1]);
            todo.classList.toggle('todo-complete');
        }
        if (event.target.classList[0] == 'trash-btn') {
            const todo = event.target.parentElement;
            app.removeTodo(todo.classList[1]);
            todo.classList.add('todo-trash');
            todo.addEventListener('transitionend', () => {
                todo.remove();
            } );
        }
    });
};

window.onload = () => {
    addingTodo();
    completeTodo();
};