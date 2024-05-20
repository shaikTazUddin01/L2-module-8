import Joi from "joi";

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
 export const studentValidationSchema = Joi.object({
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
      .required(),
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
