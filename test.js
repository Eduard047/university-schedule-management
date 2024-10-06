"use strict";
// test.ts
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index"); // исправлено
// Добавим несколько профессоров
(0, index_1.addProfessor)({ id: 1, name: 'John Doe', department: 'Math' });
(0, index_1.addProfessor)({ id: 2, name: 'Jane Smith', department: 'Physics' });
// Добавим несколько аудиторий
var classrooms = []; // добавлено
classrooms.push({ number: '101', capacity: 30, hasProjector: true });
classrooms.push({ number: '102', capacity: 25, hasProjector: false });
// Добавим занятия
(0, index_1.addLesson)({ courseId: 1, professorId: 1, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '8:30-10:00' });
(0, index_1.addLesson)({ courseId: 2, professorId: 2, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '10:15-11:45' });
// Найдем доступные аудитории
var availableClassrooms = (0, index_1.findAvailableClassrooms)('8:30-10:00', 'Monday');
console.log('Available classrooms for 8:30-10:00 on Monday:', availableClassrooms);
// Получим расписание профессора
var professorSchedule = (0, index_1.getProfessorSchedule)(1);
console.log('Schedule for Professor 1:', professorSchedule);
