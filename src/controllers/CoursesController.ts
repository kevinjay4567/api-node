import ICourse from '../interfaces/ICourse';

let courses: Array<ICourse> = []
class CoursesController {

  index(_:any, res:any) {
    res.json(courses)
  }

  store(req:any, res:any) {
    const {code, name, credits } = req.body;
    const course: ICourse = {
      code,
      name,
      credits
    }
    courses.push(course);
    res.json({
      message: 'Course register'
    })
  }

  destroy(req:any, res:any) {
    const { id } = req.params;
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      if (course.code == id) {
        courses.splice(index, 1);
        return res.json({
          message: "Course delete"
        })
      }
      return res.json({
        message: "Course not found"
      })
    }
  }

}

const instance = new CoursesController();
export default instance;
