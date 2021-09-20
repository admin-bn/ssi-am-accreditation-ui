import GuestExtendedFormModel from './guest-extended-form.model';

export default class GuestAccreditionModel {
  connectionQrCode: string;

  guest: GuestExtendedFormModel;

  id: string;

  invitationEmail: string;

  invitationLink: string;

  status: string;
}
