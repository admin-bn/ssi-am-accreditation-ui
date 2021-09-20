import { Component, EventEmitter, Output } from '@angular/core';
import UploadService from './services/upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploadService],
})
export default class UploadComponent {
  @Output() csvFileUploaded: EventEmitter<FormData> = new EventEmitter();

  public files: FileList;

  public fileInDropArea: boolean | undefined;

  public errorMessage: Array<string> = [];

  public constructor(private readonly uploadService: UploadService) {}

  public onDropAreaActive(event: boolean): void {
    this.fileInDropArea = event;
  }

  public async fileSelectionHandler(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const uploadedFiles = input.files;

    await this.fileProcess(uploadedFiles);
  }

  public async onFileDropped(files: FileList): Promise<void> {
    await this.fileProcess(files);
  }

  private async fileProcess(files: FileList | null): Promise<void> {
    if (files && files.length === 1) {
      const file = files[0];

      this.verifyFileMimeType(file);
      this.verifyFileSize(file);
      await this.verifyEncoding(file);

      if (this.errorMessage.length === 0) {
        const formData = this.uploadService.appendFileToFormData(file);

        this.emitFormData(formData);
      } else {
        // TODO: ErrorHandling
      }
    }
  }

  private emitFormData(formData: FormData): void {
    this.csvFileUploaded.emit(formData);
  }

  private verifyFileSize(file: File): void {
    if (!this.uploadService.isFileSizeValid(file)) {
      this.errorMessage.push('Size limit exceeded.');
    }
  }

  private verifyFileMimeType(file: File): void {
    if (!this.uploadService.isMimeTypeValid(file)) {
      this.errorMessage.push('Mime type is not correct.');
    }
  }

  private async verifyEncoding(file: File): Promise<void> {
    if (!(await this.uploadService.isEncodingUTF8(file))) {
      this.errorMessage.push('Encoding is not correct.');
    }
  }
}
