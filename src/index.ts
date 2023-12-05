interface TodoList {
  id: number;
  content: string;
  status: Boolean;
}
let todoList: TodoList[] = [];
if (!JSON.parse(localStorage.getItem("todoList") as string)) {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getTodo(): TodoList[] {
  const textTodo: string = localStorage.getItem("todoList") || "[]";
  return JSON.parse(textTodo);
}
function setTodo(Todos: TodoList[]): void {
  localStorage.setItem("todoList", JSON.stringify(Todos));
}
class Todo implements TodoList {
  id: number;
  content: string;
  status: Boolean;
  constructor(id: number, content: string, status: boolean) {
    this.id = id;
    this.content = content;
    this.status = status;
  }
  render(): void {
    const todoList: TodoList[] = getTodo();
    const todoBody: HTMLElement = document.querySelector(
      "#todo"
    ) as HTMLElement;
    todoBody.innerHTML = "";
    if (!todoList || todoList.length === 0) {
      todoBody.innerHTML = ` <img
        src="../img/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg"
        alt="ảnh"
      />`;
    } else {
      todoList.forEach((item: TodoList, index) => {
        todoBody.innerHTML += `
      <li>
      <div>
        <input type="checkbox" checked="checked" onclick="updateTodo(${
          item.id
        })"/>
        <span style="text-decoration:${
          item.status ? "line-through" : "none"
        }">${item.content}</span>
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
  renderFinish(): void {
    const todoList: TodoList[] = getTodo();
    const todoBody: HTMLElement = document.querySelector(
      "#task-finish"
    ) as HTMLElement;
    todoBody.innerHTML = "";

    todoList.forEach((item: TodoList, index) => {
      if (item.status === false) {
        if (item.id) {
          todoBody.innerHTML = `<p id="finish">công việc đã hoàn thành:${
            item.id-1
          }/${item.id}</p>`;
        } else {
          todoBody.innerHTML = `<p id="finish">công việc đã hoàn thành:${
            item.id 
          }/${item.id}</p>`;
        }
      } else {
        todoBody.innerHTML = `<p id="finish"> Đã hoàn thành công việc</p>`;
      }
    });
  }
  addTodo(): void {
    const MyInput: HTMLInputElement = document.getElementById(
      "text"
    ) as HTMLInputElement;
    const todo_add = getTodo();
    const textInput = MyInput.value;
    if (textInput.length == 0) {
      alert("nhập vào ô input");
    } else {
      if (todo_add.length == 0) {
        todo_add.push({
          id: 1,
          content: textInput,
          status: false,
        });
      } else {
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
  deleteTodo(index: number): void {
    const todo_delete = getTodo();
    let choice: boolean = confirm("bạn có muốn xoá không");
    if (choice == true) {
      todo_delete.splice(index, 1);
    } else {
      todo_delete.splice(index, 0);
    }
    setTodo(todo_delete);
  }
  upTodo(id: number): void {
    const todo_update = getTodo();
    const newUpdate = todo_update.map((item, i) => {
      if (item.id == id) {
        return {
          ...item,
          status: !item.status,
        };
      } else {
        return item;
      }
    });
    setTodo(newUpdate);
  }
  editTodo(id: number): void {
    const todo_edit = getTodo();
    let Edit_todo = prompt("nhập thông tin muốn sửa");
    let newData: TodoList[] = todo_edit.map((item, index) => {
      if (item.id == id) {
        return {
          ...item,
          content: Edit_todo?.trim(),
        } as TodoList;
      } else {
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
function deleteTodo(index: number) {
  renderTodo.deleteTodo(index);
  renderTodo.render();
  renderTodo.renderFinish();
}
function updateTodo(id: number) {
  renderTodo.upTodo(id);
  renderTodo.render();
  renderTodo.renderFinish();
}
function editTodo(id: number) {
  renderTodo.editTodo(id);
  renderTodo.render();
  renderTodo.renderFinish();
}
