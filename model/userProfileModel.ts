export interface userProfileModel {
  displayName: string;
  userEmail: string;
  avatar: string;
  isDarkTheme: boolean;
  password?: string;
  passwordConfirm?: string;
  userType: string;
}
