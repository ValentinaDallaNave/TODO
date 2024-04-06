const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");

function salva(todo) {
  fs.writeFileSync("todos.json", todo);
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join("chai-script.test.js")));

let todos = [];
app.post("/todo/add", (req, res) => {
  const todo = req.body.todo;
  todo.id = "" + new Date().getTime();
  todos.push(todo);
  salva(JSON.stringify(todos));
  res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
  todos = JSON.parse(fs.readFileSync("todos.json", "utf8"));
  res.json({ todos: todos });
});

app.put("/todo/complete", (req, res) => {
  const todo = req.body;
  try {
    todos = todos.map((element) => {
      if (element.id === todo.id) {
        element.completed = true;
      }
      return element;
    });
  } catch (e) {
    console.log(e);
  }
  salva(JSON.stringify(todos));
  res.json({ result: "Ok" });
});

app.delete("/todo/:id", (req, res) => {
  todos = todos.filter((element) => element.id !== req.params.id);
  salva(JSON.stringify(todos));
  res.json({ result: "Ok" });
});

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});
