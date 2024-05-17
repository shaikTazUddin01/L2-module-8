import express from 'express';
import { StudentControllers } from './student/student.controllre';

const router = express.Router();

router.post('/create-student', StudentControllers.crateStudent);

router.get('/',StudentControllers.getAllStudent)

router.get('/:studentId',StudentControllers.getSingleStudent)

export const StudentRoutes = router;