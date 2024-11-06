export default interface SignForm {
  email: string;
  password: string;
  passwordVerify?: string;
  type?: string | undefined;
}
