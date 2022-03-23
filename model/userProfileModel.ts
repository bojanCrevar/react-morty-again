export interface userProfileModel {
  displayName: string;
  userEmail: string;
  avatar?: string | Blob;
  password?: string;
  passwordConfirm?: string;
}
