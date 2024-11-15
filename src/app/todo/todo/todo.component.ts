import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DTOtodo, Todo, TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';
import { RainbowTextDirective } from 'src/app/directives/rainbow-text.directive';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService],
  standalone: true,
  imports: [FormsModule, RainbowTextDirective],
})
export class TodoComponent {
  private todoService = inject(TodoService);
  statuses = [TodoStatus.WAITING, TodoStatus.INPROGRESS, TodoStatus.DONE];

  todo: WritableSignal<DTOtodo> = signal({
    name: '',
    content: '',
  });

  addtoDo() {
    this.todoService.addTodos(this.todo());
    this.todo.set({
      name: '',
      content: '',
    });
  }

  getTodos(): Todo[] {
    return this.todoService.getTodos();
  }
  changestatus(todo: Todo, status: TodoStatus) {
    this.todoService.updateTodoStatus(todo, status);
  }
  removeTodo(id: number) {
    this.todoService.removeTodo(id);
  }
  getTodosStatus(status: TodoStatus): Todo[] {
    return this.todoService.getTodosStatus(status);
  }
}