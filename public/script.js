const add = document.getElementById("add");
const t_todo = document.getElementById("t_todo");
const input_todo = document.getElementById("todo");
let TODOS = [];

const send = (todo) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

const load = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo")
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};
load().then((json) => {
  TODOS = json.todos;
  render();
});

export function addTodo(todo){
  send({ todo: todo })
    .then(() => load())
    .then((json) => {
      TODOS = json.todos;
      render();
    });
}

add.onclick = () => {
  const todo = {
    name: input_todo.value,
    completed: false,
  };
  addTodo(todo)
  input_todo.value = "";
};

const completeTodo = (todo) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/complete", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    fetch("/todo/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

function render() {
  let html = ``;
  const template = `<tr><td>%todo</td>
  <td><button type="button" id="completa" class="completa btn btn-success">%Completa</button>
  <button type="button" id="elimina" class="elimina btn btn-danger">Elimina</button></td></tr>
  `;
  TODOS.forEach((element, index) => {
    if (element.completed === false) {
      html += template
        .replace("%todo", element.name)
        .replace("elimina", "elimina" + index)
        .replace("completa", "completa" + index)
        .replace("%Completa", "Completa");
    } else if (element.completed === true) {
      html += template
        .replace("%todo", element.name)
        .replace("elimina", "elimina" + index)
        .replace("completa", "completa" + index)
        .replace("%Completa", "Completato");
    }
  });
  t_todo.innerHTML = html;
  const elimina = document.querySelectorAll(".elimina");
  elimina.forEach((element) => {
    element.onclick = () => {
      let index = parseInt(element.id.replace("elimina", ""), 10);
      deleteTodo(TODOS[index].id);
      load().then((json) => {
        TODOS = json.todos;
        render();
      });
      render();
    };
  });
  const completa = document.querySelectorAll(".completa");
  completa.forEach((element) => {
    element.onclick = () => {
      let index = parseInt(element.id.replace("completa", ""), 10);
      completeTodo(TODOS[index]);
      load().then((json) => {
        TODOS = json.todos;
        render();
      });
      render();
    };
  });
}

setInterval(() => {
  load().then((json) => {
    TODOS = json.todos;
    render();
  });
}, 10000);
