import * as fs from "fs";
import * as path from "path";

type HeaderType = {
  courseId: string;
  weightage: Record<string, number>;
  components: Record<string, number>;
};

type GradebookEntry = {
  studentId: string;
  name: string;
  components: Array<{
    type: string;
    component: string;
    marks: number;
    totalMarks: number;
  }>;
  typePercentages: Record<string, number>;
  weightedPercentages: Record<string, number>;
  finalPercentage: number;
  finalGrade: string;
};

export class GradeModel {
  private static dataPath = path.join(__dirname, "../../grades.json");

  private static weights: Record<string, number> = {
    Homework: 40,
    Discussions: 30,
    FinalExam: 30,
  };

  private static studentNames = [
    "Alice Johnson",
    "Bob Smith",
    "Carol Brown",
    "David Wilson",
    "Emma Davis",
    "Frank Moore",
    "Grace White",
    "Henry Taylor",
    "Ivy Harris",
    "Jack Martin",
    "Linda Clark",
    "Nancy Wright",
    "Oscar Walker",
    "Paula Young",
    "Quinn Lee",
    "Robert Scott",
    "Samantha King",
    "Timothy Allen",
    "Uma Hall",
    "Victor Adams",
    "Wendy Baker",
    "Xavier Mitchell",
    "Yolanda Rivera",
    "Zachary Lewis",
  ];

  private static generateRandomGradeData() {
    const courses = [
      {
        courseId: "CS500",
        weightage: this.weights,
        components: {
          Homework: 100,
          Discussions: 25,
          FinalExam: 100,
        },
        students: this.studentNames.map((name, i) => {
          const studentId = `100${i + 1}`;
          const grades = [
            {
              type: "Homework",
              component: "HW1",
              marks: Math.floor(Math.random() * 101),
              totalMarks: 100,
            },
            {
              type: "Homework",
              component: "HW2",
              marks: Math.floor(Math.random() * 101),
              totalMarks: 100,
            },
            {
              type: "Discussions",
              component: "Discussion 1",
              marks: Math.floor(Math.random() * 26),
              totalMarks: 25,
            },
            {
              type: "Discussions",
              component: "Discussion 2",
              marks: Math.floor(Math.random() * 26),
              totalMarks: 25,
            },
            {
              type: "FinalExam",
              component: "Final",
              marks: Math.floor(Math.random() * 101),
              totalMarks: 100,
            },
          ];

          const typePercentages: Record<string, number> = {};
          const weightedPercentages: Record<string, number> = {};
          let finalPercentage = 0;

          grades.forEach((grade) => {
            const percentage = (grade.marks / grade.totalMarks) * 100;
            typePercentages[grade.type] = percentage;
            const weighted =
              (percentage * this.weights[grade.type] || 0) / 100;
            weightedPercentages[grade.type] = weighted;
            finalPercentage += weighted;
          });

          const finalGrade =
            finalPercentage >= 90
              ? "A"
              : finalPercentage >= 80
              ? "B"
              : finalPercentage >= 70
              ? "C"
              : finalPercentage >= 60
              ? "D"
              : "F";

          return {
            studentId,
            name,
            components: grades,
            typePercentages,
            weightedPercentages,
            finalPercentage: parseFloat(finalPercentage.toFixed(2)),
            finalGrade,
          };
        }),
      },
    ];

    return { courses };
  }

  public static checkOrGenerateData(): void {
    if (!fs.existsSync(this.dataPath)) {
      const defaultData = this.generateRandomGradeData();
      fs.writeFileSync(this.dataPath, JSON.stringify(defaultData, null, 2));
    }
  }

  public static async getHeader(courseId: string): Promise<HeaderType> {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataPath, "utf8"));
      const course = data.courses.find((c: any) => c.courseId === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      return {
        courseId: course.courseId,
        weightage: course.weightage,
        components: course.components,
      };
    } catch (error) {
      throw new Error(`Error reading header for course ${courseId}`);
    }
  }

  public static async getGradebook(courseId: string): Promise<GradebookEntry[]> {
    try {
      const data = JSON.parse(fs.readFileSync(this.dataPath, "utf8"));
      const course = data.courses.find((c: any) => c.courseId === courseId);
      if (!course) {
        throw new Error(`Course with ID ${courseId} not found`);
      }
      return course.students;
    } catch (error) {
      throw new Error(`Error reading gradebook for course ${courseId}`);
    }
  }
}
