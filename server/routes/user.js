const express = require('express');
const routes = express.Router();
const userController = require('../controllers/userController')


routes.get('/' ,userController.index);
routes.get('/about' ,userController.about);
routes.get('/contact' ,userController.contact);
routes.get('/login' ,userController.login);
routes.get('/StudentList' ,userController.StudentList);
routes.get('/teacherList' ,userController.teacherList);
routes.get('/registerTeachers' ,userController.registerTeachers);
routes.get('/registerStudents' ,userController.registerStudents);
routes.get('/directiondepartement' ,userController.directiondepartement);
routes.get('/AbsenceList' ,userController.AbsenceList);
routes.get('/:id', userController.delete);
routes.get('/adminlist' ,userController.adminlist);


routes.post('/loginB',userController.loginB)
routes.post('/registerTB',userController.registerTB)
routes.post('/registerSB',userController.registerSB)

routes.post('/AbsenceListB',userController.AbsenceListB)

module.exports=routes;