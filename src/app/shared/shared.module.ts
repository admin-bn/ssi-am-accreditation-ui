import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import UploadComponent from './upload/upload.component';
import DragAndDropDirective from './upload/directives/drag-and-drop.directive';

@NgModule({
  declarations: [UploadComponent, DragAndDropDirective],
  imports: [CommonModule],
  exports: [UploadComponent],
})
export default class SharedModule {}
