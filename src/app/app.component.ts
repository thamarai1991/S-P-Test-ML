import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { PasswordStrengthValidator } from "./password-strength.validators"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  personalForm: FormGroup;

  title: string = 'thamaraikannan';

  email: string = 'thamaraikannan11@gmail.com';

  location: string = 'Chennai';

  phone: number = 9578941678;

  todayDate: Date = new Date();

  edit_val: boolean = true;

  edit_span: boolean = false;

  save: boolean = false;

  showValue: boolean = false;

  clipCopy: string = "Copied to Clipboard";

  emailHideShow: boolean = false;

  timeHideShow: boolean = false;

  emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/

  phoneRegEx = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/

  constructor() { }

  ngOnInit() {
    this.personalForm = new FormGroup({
      'title': new FormControl(this.title),
      'email': new FormControl(this.email, [Validators.required, Validators.pattern(this.emailRegEx)]),
      'phone': new FormControl(this.phone, [Validators.pattern(this.phoneRegEx)]),
      'location': new FormControl(this.location),
      'timeZone': new FormControl(this.todayDate),
      'currentPassword': new FormControl(null),
      'newPassword': new FormControl(null, [Validators.required, PasswordStrengthValidator]),
      'rePassword': new FormControl(null)
    })
  }

  do_edit() {
    this.edit_val = false;
    this.edit_span = true;
  }

  do_save() {
    this.edit_span = false;
    this.edit_val = true;
    this.save = true;
    setTimeout(() => {
      this.save = false;
    }, 3000);
  }

  do_cancel() {
    this.personalForm.get('title').setValue(this.title)
    this.edit_span = false;
    this.edit_val = true;
  }

  copyEmail(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.emailHideShow = true;
    setTimeout(() => {
      this.emailHideShow = false;
    }, 1000);
  }

  copyTime(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.timeHideShow = true;
    setTimeout(() => {
      this.timeHideShow = false;
    }, 1000);
  }

  onSubmit() {
    console.log(JSON.stringify(this.personalForm.value))
    this.showValue = true;
    this.save = true;
    setTimeout(() => {
      this.save = false;
    }, 1000);
  }

}
