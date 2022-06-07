import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DateValidator } from '../utils/DateValidator';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

export interface DialogData{
  submitCallback: (result: any, callback?: (status: boolean, result: object)=>void) => void;
}

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddReminderComponent implements OnInit {

  private submitCallback: (result: any, callback?: (status: boolean, result: object)=>void) => void;
  public form: FormGroup;
  public minDate = new Date();

  constructor(private dialogRef: MatDialogRef<AddReminderComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: DialogData) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      dueDate: new FormControl('',Validators.compose([Validators.required, DateValidator.GreaterThanOrEqualToToDay])),
    });
    console.log(this.dialogData);
    this.submitCallback = this.dialogData.submitCallback;
  }

  ngOnInit(): void { }

  public OnCancel() {
    this.dialogRef.close();
  }

  public OnSubmit(){
    console.log(this.form);
    console.log(this.form?.value);
    console.log(this.form?.errors);
    if(this.form?.valid){
      this.submitCallback(this.form?.value ?? {}, this.postServerUpdateCallback);
    }
  }

  private postServerUpdateCallback = (status: boolean, result: object) => {
    console.log("postServerUpdateCallback");
    console.log(status);
    if(status){
      this.dialogRef.close();
    }
  }

  get name() { return this.form.get('name'); }

  get dueDate() { return this.form.get('dueDate'); }
}
