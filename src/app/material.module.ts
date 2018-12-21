import { NgModule } from '@angular/core';

import {
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule
} from '@angular/material';

const MAT_MODULES  = [
  MatTabsModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCheckboxModule,
  MatButtonModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }