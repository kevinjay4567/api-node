import ICourse from "./ICourse";

export default interface IUser {
  id: Number;
  name: String;
  email: String;
  password: String;
  courses?: Array<ICourse>;
}
