import { writeFileSync, readFileSync } from "fs";

function salva(todo) {
  writeFileSync("todos.json", todo);
}

export function read(todos){
  todos = JSON.parse(readFileSync("todos.json", "utf8"));
  return todos
}

export const load = () => {
  return new Promise((resolve, reject) => {
    fetch("/todo")
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      });
  });
};

const send = async (todo) => {
  try {
    const response = await fetch("/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    
  }
};

export async function addTodo(todo, TODOS){
  TODOS.push(todo)
  send({ todo: todo })
      .then(() => load())
      .then((json) => {
        TODOS = json.todos;
  });
  salva(JSON.stringify(TODOS));
  return TODOS
}

export const completeTodo = (todo) => {
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
  
export const deleteTodo = (id) => {
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

