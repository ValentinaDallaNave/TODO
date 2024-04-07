import express from "express";
import { createServer } from "http";
import { join } from "path";
const app = express();
import bodyParser from "body-parser";
import { writeFileSync, readFileSync } from "fs";

function salva(todo) {
  writeFileSync("todos.json", todo);
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use("/", express.static(join("public")));

let todos = [];
app.post("/todo/add", (req, res) => {
  const todo = req.body.todo;
  todo.id = "" + new Date().getTime();
  todos.push(todo);
  salva(JSON.stringify(todos));
  res.json({ result: "Ok" });
});

app.get("/todo", (req, res) => {
  todos = JSON.parse(readFileSync("todos.json", "utf8"));
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

const server = createServer(app);
server.listen(800, () => {
  console.log("- server running");
});
