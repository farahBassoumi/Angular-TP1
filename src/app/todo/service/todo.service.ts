import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { DTOtodo, Todo, TodoStatus } from '../model/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private todos: Todo[] = [];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodosStatus(status: TodoStatus): Todo[] {
    return this.todos.filter((todo) => todo.status === status);
  }
  addTodos(todo: DTOtodo): void {
    const id = this.todos.length + 1;
    const addedTodo = {
      id,
      name: todo.name,
      content: todo.content,
      status: TodoStatus.WAITING,
    };
    //console.log(addedTodo);
    this.todos.push(addedTodo);
  }
  updateTodoStatus(todo: Todo, status: TodoStatus): void {
    const index = this.todos.findIndex((to) => to.id === todo.id);
    if (index > -1) {
      this.todos[index].status = status;
    }
  }
  removeTodo(id: number): void {
    const index = this.todos.findIndex((to) => to.id === id);
    if (index > -1) {
      this.todos.splice(index, 1);
    }
  }
}
