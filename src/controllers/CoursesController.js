import Course from '../models/Course.js';
import courses from '../courses.json' assert { type: 'json'};

class CoursesController {

  index(req, res) {
    res.json(courses)
  }

  store(req, res) {
    const {code, name, credits } = req.body;
    const course = new Course();
    course.code = code;
    course.name = name;
    course.credits = credits;
    courses.push(course);
    res.json({
      message: 'Course register'
    })
  }

  destroy(req, res) {
    const { id } = req.body;
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      if (course.id == id) {
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