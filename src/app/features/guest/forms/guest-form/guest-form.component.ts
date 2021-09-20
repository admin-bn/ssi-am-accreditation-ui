/* eslint-disable class-methods-use-this */
/* eslint-disable import/prefer-default-export */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import FormValidator from '../../../../shared/utilities/form-validator';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss'],
  providers: [FormValidator],
})
export class GuestFormComponent {
  @Output()
  private readonly submitForm: EventEmitter<void> = new EventEmitter<void>();

  public guestForm: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder, private readonly formValidator: FormValidator) {
    this.guestForm = this.createGuestForm();
  }

  public submit(): void {
    this.submitForm.emit();
  }

  private createGuestForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.formValidator.requiredNoWhitespaceFill(),
          this.formValidator.forbiddenCharactersString(),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.formValidator.requiredNoWhitespaceFill(),
          this.formValidator.forbiddenCharactersString(),
        ],
      ],
      companyName: [
        '',
        [
          Validators.required,
          Validators.maxLength(100),
          this.formValidator.requiredNoWhitespaceFill(),
          this.formValidator.forbiddenCharactersString(),
        ],
      ],
      title: ['', [Validators.maxLength(50), this.formValidator.forbiddenCharactersString()]],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.email,
          this.formValidator.requiredNoWhitespaceFill(),
        ],
      ],
      typeOfVisit: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.formValidator.requiredNoWhitespaceFill(),
          this.formValidator.forbiddenCharactersString(),
        ],
      ],
      location: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.formValidator.requiredNoWhitespaceFill(),
          this.formValidator.forbiddenCharactersString(),
        ],
      ],
      validFromDate: ['', [Validators.required]],
      validFromTime: ['', [Validators.required]],
      validUntilDate: ['', [Validators.required]],
      validUntilTime: ['', [Validators.required]],
    });
  }
}
