import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITodo } from '../model/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todo: ITodo[] = [];
  inprogress: ITodo[] = [];
  done: ITodo[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      taskName: ['', Validators.required],
    });
  }

  drop(event: CdkDragDrop<ITodo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  deleteTodo(i: number) {
    this.todo.splice(i, 1);
  }
  deleteInProgress(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteDone(i: number) {
    this.done.splice(i, 1);
  }

  editTodo(i: number) {}
  editInProgress(i: number) {}
  editDone(i: number) {}

  onSubmit(): void {
    this.todo.push({ description: this.todoForm.value.taskName, done: false });
    this.todoForm.reset();
  }
}
