/**
 * Main data model for a view.
 * This root model OPTIONALLY may implement data structure interfaces of all subset models
 * Or may implement limited set of properties that views are intersted in
 * "golden source" for a view
 */
export default class EmployeeViewModel {
  firstName!: string;

  lastName!: string;

  employeeId?: string;

  email?: string;

  firmName?: string;

  firmSubject?: string;

  firmStreet?: string;

  firmPostalCode?: string;

  firmCity?: string;
}
