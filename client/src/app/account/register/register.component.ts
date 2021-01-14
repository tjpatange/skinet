import { Router } from '@angular/router';
import { AccountService } from './../account.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[];
  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required], null],
      email: [null,
        [Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [this.validateEmailNotTaken()]],
      password: [null, [Validators.required], null],
    });
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return control => {
      return timer(500)
      .pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value)
          .pipe(
            map(res => {
              return res ? {emailExists: true} : null;
            })
          );
        })
      );
    };
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value)
    .subscribe(response => {
      this.router.navigateByUrl('/shop');
    }, err => {
      console.log(err);
      this.errors = err.errors;
    });
  }

}
