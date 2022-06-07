import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MDCRipple } from '@material/ripple';
import { AddReminderComponent } from '../add-reminder/add-reminder.component';
import { TaskManagementService } from '../services/task-management.service';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent implements OnInit {

  public tasks: any[] = [];
  constructor(private dialog: MatDialog, private taskMgmtService: TaskManagementService) { }

  ngOnInit(): void {

    const selector = '.mdc-button, .mdc-icon-button, .mdc-card__primary-action';
    const ripples = [].map.call(document.querySelectorAll(selector), function (el) {
      return new MDCRipple(el);
    });

    this.retriveAllTasks();
  }

  private retriveAllTasks() {
    this.taskMgmtService.getTasks()
      .subscribe((data) => this.tasks = this.formatData(data));
  }

  private formatData(data: any[]) {
    data.forEach((element: any) => {
      element.dueDate = moment(element?.dueDate).format("YYYY-MM-DD");
    });
    return data;
  }

  public AddNewReminder() {
    this.dialog.open(AddReminderComponent, {
      width: '40%',
      //minHeight: 'calc(75vh - 50px)',d
      height: 'auto',
      data: {
        submitCallback: this.submitAction
      },
    });
  }

  private submitAction = (result: any, callback?: (status: boolean, result: object) => void) => {
    const data = { "taskName": result.name, "dueDate": result.dueDate.valueOf() };
    this.taskMgmtService.createTask(data)
      .subscribe((response) => {
        this.retriveAllTasks();
        if (!!callback) {
          callback(true, response)
        }
      });
  }

  changeCompletionState(event: any, taskId: number) {
    this.taskMgmtService.updateCompletionStatusOfTask(taskId, { "completed": event.checked })
      .subscribe((data) => this.retriveAllTasks());
  }

}
