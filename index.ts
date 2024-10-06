type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

const professors: Professor[] = [];
const classrooms: Classroom[] = [];
const {find}: Course[] = [];
const schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {

    schedule.push(lesson);
    return true;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    return classrooms
        .filter(classroom => !schedule.some(lesson => lesson.classroomNumber === classroom.number && lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek))
        .map(classroom => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    const professorConflict = schedule.some(l => l.professorId === lesson.professorId && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek);
    if (professorConflict) {
        return { type: "ProfessorConflict", lessonDetails: lesson };
    }

    const classroomConflict = schedule.some(l => l.classroomNumber === lesson.classroomNumber && l.timeSlot === lesson.timeSlot && l.dayOfWeek === lesson.dayOfWeek);
    if (classroomConflict) {
        return { type: "ClassroomConflict", lessonDetails: lesson };
    }

    return null;
}

function getClassroomUtilization(classroomNumber: string): number {
    const totalLessons = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    const possibleSlots = 5 * 5; // 5 дней по 5 слотов
    return (totalLessons / possibleSlots) * 100;
}

function getMostPopularCourseType(): CourseType {
    const typeCount: Record<CourseType, number> = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0,
    };

    schedule.forEach(lesson => {
        const course = find(c => c.id === lesson.courseId);
        if (course) {
            typeCount[course.type]++;
        }
    });

    return Object.keys(typeCount).reduce((a, b) => (typeCount[a as CourseType] > typeCount[b as CourseType] ? a : b)) as CourseType;
}
