import ICourse from "../interfaces/ICourse";
import { prisma } from "../dbclient";
import { userAuth } from "./AuthController";

let courses: Array<ICourse> = [];
class CoursesController {
  async index(_: any, res: any) {
    const user = await prisma.user.findUnique({
      where: {
        id: userAuth.id,
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

  async showNoAddedCourses(_: any, res: any) {
    const courses = await prisma.course.findMany({
      where: {
        NOT: {
          users: {
            some: {
              id: userAuth.id,
            },
          },
        },
      },
    });

    return res.json({
      message: "OK",
      data: courses,
    });
  }

  async store(req: any, res: any) {
    const { name, credits, type } = req.body;

    if (!name || !credits || !type) {
      return res.status(400).json({
        error: "Empty field",
      });
    }

    const course = await prisma.course.create({
      data: {
        name: name,
        credits: credits,
        aprobe: false,
        type: type,
      },
    });
    res.json({
      message: "Course register",
      data: course,
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
