export interface userProfileModel {
  _id?: string;
  displayName?: string;
  email: string;
  avatar?: string;
  password?: string;
  passwordConfirm?: string;
  userType: string;
  isDarkTheme?: boolean;
}
