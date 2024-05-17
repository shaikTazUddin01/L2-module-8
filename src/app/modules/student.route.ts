import express from 'express';
import { StudentControllers } from './student/student.controllre';

const router = express.Router();

router.post('/create-student', StudentControllers.crateStudent);


export const StudentRoutes = router;