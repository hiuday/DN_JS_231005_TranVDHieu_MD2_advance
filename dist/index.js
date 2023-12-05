"use strict";
let todoList = [];
if (!JSON.parse(localStorage.getItem("todoList"))) {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getTodo() {
    const textTodo = localStorage.getItem("todoList") || "[]";
    return JSON.parse(textTodo);
}
function setTodo(Todos) {
    localStorage.setItem("todoList", JSON.stringify(Todos));
}
class Todo {
    constructor(id, content, status) {
        this.id = id;
        this.content = content;
        this.status = status;
    }
    render() {
        const todoList = getTodo();
        const todoBody = document.querySelector("#todo");
        todoBody.innerHTML = "";
        if (!todoList || todoList.length === 0) {
            todoBody.innerHTML = ` <img
        src="../img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
        alt="ảnh"
      />`;
        }
        else {
            todoList.forEach((item, index) => {
                todoBody.innerHTML += `
      <li>
      <div>
        <input type="checkbox" checked="checked" onclick="updateTodo(${item.id})"/>
        <span style="text-decoration:${item.status ? "line-through" : "none"}">${item.content}</span>
      </div>
      <div>
        <button type="button" onclick="editTodo(${item.id})">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button onclick="deleteTodo(${index})">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </li>
   
    `;
            });
        }
    }
    renderFinish() {
        const todoList = getTodo();
        const todoBody = document.querySelector("#task-finish");
        todoBody.innerHTML = "";
        todoList.forEach((item, index) => {
            if (item.status === false) {
                if (item.id) {
                    todoBody.innerHTML = `<p id="finish">công việc đã hoàn thành:${item.id - 1}/${item.id}</p>`;
                }
                else {
                    todoBody.innerHTML = `<p id="finish">công việc đã hoàn thành:${item.id}/${item.id}</p>`;
                }
            }
            else {
                todoBody.innerHTML = `<p id="finish"> Đã hoàn thành công việc</p>`;
            }
        });
    }
    addTodo() {
        const MyInput = document.getElementById("text");
        const todo_add = getTodo();
        const textInput = MyInput.value;
        if (textInput.length == 0) {
            alert("nhập vào ô input");
        }
        else {
            if (todo_add.length == 0) {
                todo_add.push({
                    id: 1,
                    content: textInput,
                    status: false,
                });
            }
            else {
                todo_add.push({
                    id: todo_add[todo_add.length - 1].id + 1,
                    content: textInput,
                    status: false,
                });
            }
        }
        setTodo(todo_add);
        //làm mới ô input
    }
    deleteTodo(index) {
        const todo_delete = getTodo();
        let choice = confirm("bạn có muốn xoá không");
        if (choice == true) {
            todo_delete.splice(index, 1);
        }
        else {
            todo_delete.splice(index, 0);
        }
        setTodo(todo_delete);
    }
    upTodo(id) {
        const todo_update = getTodo();
        const newUpdate = todo_update.map((item, i) => {
            if (item.id == id) {
                return Object.assign(Object.assign({}, item), { status: !item.status });
            }
            else {
                return item;
            }
        });
        setTodo(newUpdate);
    }
    editTodo(id) {
        const todo_edit = getTodo();
        let Edit_todo = prompt("nhập thông tin muốn sửa");
        let newData = todo_edit.map((item, index) => {
            if (item.id == id) {
                return Object.assign(Object.assign({}, item), { content: Edit_todo === null || Edit_todo === void 0 ? void 0 : Edit_todo.trim() });
            }
            else {
                return item;
            }
        });
        setTodo(newData);
    }
}
const renderTodo = new Todo(0, "", false);
renderTodo.render();
renderTodo.renderFinish();
function addTodo() {
    renderTodo.addTodo();
    renderTodo.render();
    renderTodo.renderFinish();
}
function deleteTodo(index) {
    renderTodo.deleteTodo(index);
    renderTodo.render();
    renderTodo.renderFinish();
}
function updateTodo(id) {
    renderTodo.upTodo(id);
    renderTodo.render();
    renderTodo.renderFinish();
}
function editTodo(id) {
    renderTodo.editTodo(id);
    renderTodo.render();
    renderTodo.renderFinish();
}
