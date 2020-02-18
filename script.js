let todoList = {
  todos: [],

  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function() {
    let totalTodos = this.todos.length;
    let completedTodos = 0;

    //Get number of completed todos

    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });

    if (completedTodos === totalTodos) {
      //for (let i = 0; i < totalTodos; i++) {
      // this.todos[i].completed = false;
      //}
      this.todos.forEach(function(todo) {
        todo.completed = false;
      });
    } else {
      //for (let i = 0; i < totalTodos; i++) {
      //this.todos[i].completed = true;
      this.todos.forEach(function(todo) {
        todo.completed = true;
      });
    }
    this.displayTodos();
  }
};

let handlers = {
  displayTodos: function() {
    view.displayTodos();
  },
  toggleAll: function() {
    view.toggleAll();
  },
  addTodo: function() {
    let addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    let changeTodoPositionInput = document.getElementById(
      "changeTodoPositionInput"
    );
    let changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(
      changeTodoPositionInput.valueAsNumber,
      changeTodoTextInput.value
    );
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    let toggleCompletedPositionInput = document.getElementById(
      "toggleCompletedPositionInput"
    );
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
  },
  toggleAll: function() {
    todoList.toggleAll();
  }
};

let view = {
  displayTodos: function() {
    let todosUl = document.querySelector("ul");
    todosUl.innerHTML = " ";
    todoList.todos.forEach(function(todo, position) {
      //for (let i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement("li");
      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.name = "name";
      checkBox.value = "value";
      checkBox.className = "completed";
      let label = document.createElement("label");
      label.htmlFor = position;
      label.appendChild(document.createTextNode(todo.todoText));
      let todoTextWithCompletion = " ";

      //if (todo.completed === true) {
      //todoTextWithCompletion = "(x)" + todo.todoText;
      //} else {
      // todoTextWithCompletion = todo.todoText;
      //}

      //todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(checkBox);
      todoLi.appendChild(label);

      todoLi.appendChild(this.createDeleteButton());

      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },

  setUpEventListeners: function() {
    let todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      console.log(event.target.parentNode.id);

      //Element clicked
      let elementClicked = event.target;

      //Check if delete button is clicked
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }
};
view.setUpEventListeners();
