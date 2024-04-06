import { expect } from 'chai';
import request from "request";
import { JSDOM } from 'jsdom';
const { window } = new JSDOM('');
const { document } = window;

const elementoMock = document.createElement('add');
elementoMock.id = 'mockadd';
document.body.appendChild(elementoMock);
import { addTodo } from './public/script.js';

describe('Gestione Todo', function() {
  describe('Aggiungi Todo', function() {
    it('dovrebbe aggiungere una nuova todo', function() {
      let todos = [];
      const nuovaTodo = { name: 'Fare la spesa', completed: false };
      todos = addTodo(nuovaTodo);
      expect(todos.includes(nuovaTodo));
      done()
    });
  });
})