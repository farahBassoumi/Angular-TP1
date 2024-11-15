export interface Todo {
  id: number;
  name: string;
  content: string;
  status: TodoStatus;
}
export enum TodoStatus {
  WAITING = 'waiting',
  INPROGRESS = 'inprogress',
  DONE = 'done',
}
export interface DTOtodo {
  name: string;
  content: string;
}
