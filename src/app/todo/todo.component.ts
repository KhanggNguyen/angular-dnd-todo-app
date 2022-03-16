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

  updateId!: any;
  isEditEnable: boolean = false;

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

  deleteTodoTask(i: number) {
    this.todo.splice(i, 1);
  }
  deleteInProgressTask(i: number) {
    this.inprogress.splice(i, 1);
  }
  deleteDoneTask(i: number) {
    this.done.splice(i, 1);
  }

  onSubmit(): void {
    this.todo.push({ description: this.todoForm.value.taskName, done: false });
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnable = false;
  }

  onEdit(task: ITodo, i: number) {
    this.todoForm.controls['taskName'].setValue(task.description);
    this.updateId = i;
    this.isEditEnable = true;
  }

  updateTodoTask(): void {
    this.todo[this.updateId].description = this.todoForm.value.taskName;
    this.todo[this.updateId].done = false;
    this.todoForm.reset();
    this.updateId = undefined;
    this.isEditEnable = false;
  }
}
