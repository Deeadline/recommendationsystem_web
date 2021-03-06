import {FormGroup} from '@angular/forms';

export abstract class CoreViewModel<T> {

  protected constructor(protected apiModel: T) {
  }

  abstract fromApiModel(): void;

  abstract toApiModel(): T;

  abstract applyForm(form: FormGroup): this;
}
