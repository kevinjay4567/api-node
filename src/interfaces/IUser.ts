import ICourse from './ICourse'

export default interface IUser {
  id: Number;
  name: String;
  cedula: String;
  age: Number;
  email: String;
  courses: Array<ICourse>;
}
