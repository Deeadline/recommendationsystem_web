import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../../core/service/auth.service';
import {UserRegisterViewModel} from '../../../../core/model/user-register.view.model';

@Component({
  selector: 'app-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  public form: FormGroup;
  public showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }


  public ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6),
          Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/g)]],
        repeatPassword: [null, [Validators.required, this.validatePassword]]
      }
    );
  }

  private validatePassword(control: AbstractControl): ValidationErrors | null {
    if (control.parent && control.value) {
      const passwordValue = control.parent.get('password').value;
      return passwordValue === control.value ? null : {custom: 'Passwords are not same!'};
    }
    return null;
  }

  private submit(): void {
    if (this.form.valid) {
      this.showSpinner = true;
      this.authService.register(Object.assign(new UserRegisterViewModel, this.form.value))
        .subscribe(
          () => {
            this.showSpinner = false;
            this.router.navigate(['/auth/login']);
          },
          (err) => {
            this.showSpinner = false;
            console.log(err);
          }
        );
    }
  }

}
