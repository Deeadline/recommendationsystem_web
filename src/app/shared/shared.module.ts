import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSidenavModule, MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';

library.add(fas);

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTooltipModule,
    MatPaginatorModule,
    FontAwesomeModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule
  ],
  exports: [
    MatCardModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule
  ]
})
export class SharedModule {
}
