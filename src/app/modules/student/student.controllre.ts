import { Request, Response } from 'express';
import { StudentServices } from './student.servce';

const crateStudent = async (req: Request, res: Response) => {
  try {
    const {student : studentData} = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);

    //sent response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });

  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers ={
    crateStudent
}
