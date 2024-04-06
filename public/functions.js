export function addTodo(todo, TODOS){
    TODOS.push(todo)
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

