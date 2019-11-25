import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {NotFoundPageComponent} from './core/page/not-found/not-found.component';
import {AppLayoutComponent} from './core/layout/app/app-layout.component';

const routes: Routes = [
  {
    path: '**',
    component: AppLayoutComponent,
    children: [
      {
        component: NotFoundPageComponent,
        path: ''
      }
    ]
  },
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes),
    CoreModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
