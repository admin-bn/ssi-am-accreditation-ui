import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDragAndDrop]',
})
export default class DragAndDropDirective {
  @HostBinding('class.fileInDropArea') fileInDropArea: boolean;

  @Output() fileDropped: EventEmitter<FileList> = new EventEmitter<FileList>();

  @Output() dropAreaActive: EventEmitter<boolean> = new EventEmitter();

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileInDropArea = true;
    this.dropAreaActive.emit(true);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileInDropArea = false;
    this.dropAreaActive.emit(false);
  }

  // Drop listener
  @HostListener('drop', ['$event']) public onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileInDropArea = false;
    this.dropAreaActive.emit(false);

    if (event.dataTransfer) {
      const { files } = event.dataTransfer;
      if (files.length > 0) {
        this.fileDropped.emit(files);
      }
    }
  }
}
