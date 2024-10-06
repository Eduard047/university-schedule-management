interface Professor {
    id: number;
    name: string;
    department: string;
}

interface Classroom {
    number: string;
    capacity: number;
    hasProjector: boolean;
}

interface Lesson {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: string;
    timeSlot: string;
}

interface Course {
    id: number;
    name: string;
}

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const lessons: Lesson[] = [];
const courses: Course[] = [];


function addProfessor(professor: Professor) {
    professors.push(professor);
}


function addLesson(lesson: Lesson) {
    lessons.push(lesson);
}


function addCourse(course: Course) {
    courses.push(course);
}


function findAvailableClassrooms(timeSlot: string, dayOfWeek: string): Classroom[] {
    const occupiedClassrooms = lessons
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);


    return classrooms.filter(classroom => occupiedClassrooms.indexOf(classroom.number) === -1);

}


function getProfessorSchedule(professorId: number) {
    return lessons.filter(lesson => lesson.professorId === professorId);
}


export { addProfessor, addLesson, addCourse, findAvailableClassrooms, getProfessorSchedule };

console.log('Professors:', professors);
console.log('Lessons:', lessons);
console.log('Classrooms:', classrooms);
