import { Request, Response } from 'express';
import { StudentServices } from './student.servce';
import Joi from 'joi';

const crateStudent = async (req: Request, res: Response) => {
  try {
    // Define the UserName schema
    const userNameSchema = Joi.object({
      firstName: Joi.string()
        .required()
        .max(20)
        .trim()
        .regex(/^[A-Z]/)
        .message('First name must be capitalized'),
      middleName: Joi.string().optional().allow(''),
      lastName: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!/^[a-zA-Z]+$/.test(value)) {
            return helpers.error('any.invalid');
          }
          return value;
        }, 'Alpha Validation')
        .message('{#label} is not valid'),
    });

    // Define the Guardian schema
    const guardianSchema = Joi.object({
      fatherName: Joi.string().required().label("Father's name"),
      fatherOccupation: Joi.string().required().label("Father's occupation"),
      fatherContactNo: Joi.string().required().label("Father's contact number"),
      motherName: Joi.string().required().label("Mother's name"),
      motherOccupation: Joi.string().required().label("Mother's occupation"),
      motherContactNo: Joi.string().required().label("Mother's contact number"),
    });

    // Define the LocalGuardian schema
    const localGuardianSchema = Joi.object({
      name: Joi.string().required().label("Local guardian's name"),
      occupation: Joi.string().required().label("Local guardian's occupation"),
      contactNo: Joi.string()
        .required()
        .label("Local guardian's contact number"),
      address: Joi.string().required().label("Local guardian's address"),
    });

    // Define the Student schema
    const studentSchema = Joi.object({
      id: Joi.string().required().label('Student ID'),
      name: userNameSchema.required().label('Student name'),
      gender: Joi.string().valid('male', 'female').required().messages({
        'any.only': '{#label} is not supported',
      }),
      dateOfBirth: Joi.string().required().label('Date of Birth'),
      email: Joi.string().email().required().label('Email'),
      contactNo: Joi.string().required().label('Contact number'),
      emergencyContactNo: Joi.string()
        .required()
        .label('Emergency contact number'),
      bloodgroup: Joi.string()
        .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
        .required()
        .messages({
          'any.only': '{#label} is not supported',
        }),
      presentAddress: Joi.string().required().label('Present address'),
      permanentAddress: Joi.string().required().label('Permanent address'),
      guardian: guardianSchema.required().label('Guardian details'),
      localGuardian: localGuardianSchema
        .required()
        .label('Local guardian details'),
      profileImg: Joi.string().optional().allow('').label('Profile image'),
      isActive: Joi.string()
        .valid('active', 'blocked')
        .default('active')
        .messages({
          'any.only': '{#label} is not supported',
        }),
    });


    
    const { student: studentData } = req.body;

    const result = await StudentServices.createStudentIntoDB(studentData);

    //sent response
    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
      error: error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentsFromDb(studentId);

    //sent response
    res.status(200).json({
      success: true,
      message: 'student are retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  crateStudent,
  getAllStudent,
  getSingleStudent,
};
