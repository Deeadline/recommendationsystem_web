import {Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthDataProvider} from '../../core/data-provider/auth.data-provider';

@Directive({
  selector: '[appRoleDirective]'
})
export class RoleDirective {

  @Input()
  set appRoleDirective(value: string) {
    this.authProvider.current.subscribe((user) => {
      if (user.role === value) {
        this.vcr.createEmbeddedView(this.templateRef);
      } else {
        this.vcr.clear();
      }
    });
  }

  constructor(
    private authProvider: AuthDataProvider,
    private vcr: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
  }

}
