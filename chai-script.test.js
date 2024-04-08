import { expect } from 'chai';
import { addTodo, deleteTodo, load, completeTodo , read} from './public/functions.js';


describe('Gestione Todo', function() {
  describe('Aggiungi Todo', async function() {
    it('dovrebbe aggiungere una nuova todo', async function() {
      let todos = [];
      const nuovaTodo = { 
        name: 'Fare la spesa', 
        completed: false, 
        id:1
      };
      todos = await addTodo(nuovaTodo, todos);
     
      console.log(todos)
      expect(todos.includes(nuovaTodo));
    });
  });

  describe('Elimina', async function() {
    it('dovrebbe aggiungere ed eliminare una todo', async function() {
      let todos = [];
      const nuovaTodo = { 
        name: 'Fare la spesa', 
        completed: false, 
        id:1
      };
      const values = await addTodo(nuovaTodo, todos);
      todos = values[0];
      const id = values[1];
    
      deleteTodo(1).then(()=>{ 
        todos=read(todos)
        expect(!todos.includes(nuovaTodo))
      })
    });
  });

  describe('Completa', async function() {
    it('dovrebbe aggiungere e completare una todo', async function(){
      let todos = [];
      const nuovaTodo = { 
        name: 'Fare la spesa', 
        completed: false, 
        id:1
      };
      const values = await addTodo(nuovaTodo, todos);
      todos = values[0];
      const id = values[1];

      completeTodo(nuovaTodo).then((
        load().then((json)=>{
          todos=json.todos;
          todos.forEach((todo)=>{
            if(todo.id==id){
              expect(todo.completed)
            }
          })
        })
      ))
    } )
  })

  
})