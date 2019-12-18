import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule, MatChipsModule,
  MatFormFieldModule, MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule, MatPaginatorModule,
  MatProgressSpinnerModule, MatSelectModule,
  MatSidenavModule, MatTableModule,
  MatTooltipModule
} from '@angular/material';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

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
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgbModule
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
    MatGridListModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgbModule
  ]
})
export class SharedModule {
}
