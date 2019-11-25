import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/service/auth.service';
import {Router} from '@angular/router';
import {UserLoginViewModel} from '../../../../core/model/user-login.view.model';

@Component({
  selector: 'app-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  public form: FormGroup;
  public showSpinner = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  public ngOnInit() {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  private login(): void {
    if (this.form.valid) {
      this.authService.login(Object.assign(new UserLoginViewModel(), this.form.value))
        .subscribe(
          () => this.router.navigate(['/app/dashboard']),
          (err) => {
            console.log(err);
          });
    }
  }

  private register(): void {
    this.router.navigate(['/auth/register']);
  }
}
