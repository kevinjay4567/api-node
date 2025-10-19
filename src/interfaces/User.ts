import Course from "./Course";

export default interface User {
  id: Number;
  name: String;
  email: String;
  password: String;
  courses?: Array<Course>;
}
