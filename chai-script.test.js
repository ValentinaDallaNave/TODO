import { expect } from 'chai';
import request from "request";
import { JSDOM } from 'jsdom';
const { window } = new JSDOM('');
const { document } = window;
import { addTodo } from './public/functions.js';

describe('Gestione Todo', function() {
  describe('Aggiungi Todo', function() {
    it('dovrebbe aggiungere una nuova todo', function() {
      let todos = [];
      const nuovaTodo = { name: 'Fare la spesa', completed: false };
      todos = addTodo(nuovaTodo, todos);
      console.log(todos)
      expect(todos.includes(nuovaTodo));
    });
  });
})