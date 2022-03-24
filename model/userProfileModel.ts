export interface userProfileModel {
  _id?: string;
  displayName?: string;
  email: string;
  avatar?: string | Blob;
  password?: string;
  passwordConfirm?: string;
  userType: string;
  isDarkTheme?: boolean;
}
