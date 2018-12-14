import { NgModule } from '@angular/core';

import {
  MatTabsModule
} from '@angular/material';

const MAT_MODULES  = [
  MatTabsModule
];

@NgModule({
  imports: MAT_MODULES,
  exports: MAT_MODULES,
  declarations: []
})
export class MaterialModule { }