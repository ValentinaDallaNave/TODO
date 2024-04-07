import { expect } from 'chai';
import { addTodo } from './public/functions.js';


describe('Gestione Todo', function() {
  describe('Aggiungi Todo', async function() {
    it('dovrebbe aggiungere una nuova todo', async function() {
      let todos = [];
      const nuovaTodo = { 
        name: 'Fare la spesa', 
        completed: false, 
      };
      todos = await addTodo(nuovaTodo, todos);
      console.log(todos)
      expect(todos.includes(nuovaTodo));
    });
  });
})