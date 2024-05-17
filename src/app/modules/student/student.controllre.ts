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

const getAllStudent =async(req : Request ,res : Response)=>{

  try {
    const result =await StudentServices.getAllStudentsFromDb();

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }

}

const getSingleStudent = async (req:Request, res:Response)=>{

  try {
    const {studentId} =req.params


    const result =await StudentServices.getSingleStudentsFromDb(studentId);

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });


  } catch (error) {
    console.log(error);
  }
}

export const StudentControllers ={
    crateStudent,
    getAllStudent,
    getSingleStudent
}
