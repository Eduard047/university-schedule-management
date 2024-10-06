import { addProfessor, addLesson, findAvailableClassrooms, getProfessorSchedule } from './index';


addProfessor({ id: 1, name: 'John Doe', department: 'Math' });
addProfessor({ id: 2, name: 'Jane Smith', department: 'Physics' });


let classrooms: { number: string; capacity: number; hasProjector: boolean; }[] = [];
classrooms.push({ number: '101', capacity: 30, hasProjector: true });
classrooms.push({ number: '102', capacity: 25, hasProjector: false });


addLesson({ courseId: 1, professorId: 1, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '8:30-10:00' });
addLesson({ courseId: 2, professorId: 2, classroomNumber: '101', dayOfWeek: 'Monday', timeSlot: '10:15-11:45' });


const availableClassrooms = findAvailableClassrooms('8:30-10:00', 'Monday');
console.log('Available classrooms for 8:30-10:00 on Monday:', availableClassrooms);


const professorSchedule = getProfessorSchedule(1);
console.log('Schedule for Professor 1:', professorSchedule);
