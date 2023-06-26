import ICourse from "../interfaces/ICourse";
import { prisma } from "../db";

let courses: Array<ICourse> = [];
class CoursesController {
  async index(req: any, res: any) {
    const { id } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        courses: true,
      },
    });

    if (user) {
      return res.json({
        message: "OK",
        data: user.courses,
      });
    }
    return res.json({
      error: "User not found",
    });
  }

  store(req: any, res: any) {
    const { code, name, credits } = req.body;
    const course: ICourse = {
      code,
      name,
      credits,
    };
    courses.push(course);
    res.json({
      message: "Course register",
    });
  }

  destroy(req: any, res: any) {
    const { id } = req.params;
    for (let index = 0; index < courses.length; index++) {
      const course = courses[index];
      if (course.code == id) {
        courses.splice(index, 1);
        return res.json({
          message: "Course delete",
        });
      }
      return res.json({
        message: "Course not found",
      });
    }
  }
}

const instance = new CoursesController();
export default instance;
