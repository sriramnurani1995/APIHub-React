import { Request, Response } from 'express';
import { GradeModel } from '../models/GradeModel';

const gradeController = {
  async getHeader(req: Request, res: Response) {
    const courseId = req.params.courseId;
    const header = await GradeModel.getHeader(courseId);
    res.json(header);
  },

  async getGradebook(req: Request, res: Response) {
    const courseId = req.params.courseId;
    const gradebook = await GradeModel.getGradebook(courseId);
    res.json({ courseId, gradebook });
  },
};

export default gradeController;
