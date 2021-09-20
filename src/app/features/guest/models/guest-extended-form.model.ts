import GuestApiModel from './guest-api.model';

export default class GuestExtendedFormModel extends GuestApiModel {
  dateOfBirth: string;

  licencePlateNumber: string;

  companyStreet: string;

  companyCity: string;

  companyPostCode: string;

  acceptedDocument: string;
}
