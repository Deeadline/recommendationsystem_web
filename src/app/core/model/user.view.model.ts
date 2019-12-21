import {CoreViewModel} from './core.view.model';
import {UserApiModel} from '../../api/model/user.api.model';
import {FormGroup} from '@angular/forms';
import {RoleEnum} from '../enum/role.enum';

export class UserViewModel extends CoreViewModel<UserApiModel> {
  public firstName: string;
  public lastName: string;
  public email: string;
  public role: string;

  constructor(protected apiModel: UserApiModel = new UserApiModel()) {
    super(apiModel);
    this.fromApiModel();
  }

  applyForm(form: FormGroup): this {
    return this;
  }

  fromApiModel(): void {
    this.firstName = this.apiModel.firstName;
    this.lastName = this.apiModel.lastName;
    this.email = this.apiModel.email;
    this.role = RoleEnum[this.apiModel.role];
  }

  toApiModel(): UserApiModel {
    return this.apiModel;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
