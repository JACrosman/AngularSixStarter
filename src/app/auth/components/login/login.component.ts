import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { Authenticate } from '../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
   /** Whether the user is waiting to login or not */
   @Input()
   pending: boolean;

   /** Current login error message */
   @Input() errorMessage: string | null;

   /** Notify the user wants to login */
   @Output() submitted = new EventEmitter<Authenticate>();

  /** Reference to login form */
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  /**
   * Attempt to login
   */
  submitForm() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
}
