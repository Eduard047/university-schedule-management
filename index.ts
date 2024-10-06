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

let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    const conflict = validateLesson(lesson);
    if (!conflict) {
        schedule.push(lesson);
        return true;
    }
    return false;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
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
    for (const scheduledLesson of schedule) {
        if (
            scheduledLesson.professorId === lesson.professorId &&
            scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
            scheduledLesson.timeSlot === lesson.timeSlot
        ) {
            return {
                type: "ProfessorConflict",
                lessonDetails: scheduledLesson
            };
        }
        if (
            scheduledLesson.classroomNumber === lesson.classroomNumber &&
            scheduledLesson.dayOfWeek === lesson.dayOfWeek &&
            scheduledLesson.timeSlot === lesson.timeSlot
        ) {
            return {
                type: "ClassroomConflict",
                lessonDetails: scheduledLesson
            };
        }
    }
    return null;
}

function getClassroomUtilization(classroomNumber: string): number {
    const totalSlots = 5 * 5; // 5 днів по 5 слотів
    const occupiedSlots = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;
    return (occupiedSlots / totalSlots) * 100;
}

function getMostPopularCourseType(): CourseType {
    const courseTypeCount: Record<CourseType, number> = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0,
    };

    for (const lesson of schedule) {
        const course = courses.find(c => c.id === lesson.courseId);
        if (course) {
            courseTypeCount[course.type]++;
        }
    }

    return Object.keys(courseTypeCount).reduce((a, b) =>
        courseTypeCount[a as CourseType] > courseTypeCount[b as CourseType] ? a : b
    ) as CourseType;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (lessonIndex >= 0) {
        const lesson = schedule[lessonIndex];
        const conflict = validateLesson({ ...lesson, classroomNumber: newClassroomNumber });
        if (!conflict) {
            schedule[lessonIndex].classroomNumber = newClassroomNumber;
            return true;
        }
    }
    return false;
}

function cancelLesson(lessonId: number): void {
    const index = schedule.findIndex(lesson => lesson.courseId === lessonId);
    if (index >= 0) {
        schedule.splice(index, 1);
    }
}

addProfessor({ id: 1, name: "John Smith", department: "Math" });
addProfessor({ id: 2, name: "Jane Doe", department: "Physics" });

classrooms.push({ number: "101", capacity: 30, hasProjector: true });
classrooms.push({ number: "102", capacity: 25, hasProjector: false });

courses.push({ id: 1, name: "Algebra", type: "Lecture" });
courses.push({ id: 2, name: "Quantum Mechanics", type: "Seminar" });

addLesson({ courseId: 1, professorId: 1, classroomNumber: "101", dayOfWeek: "Monday", timeSlot: "8:30-10:00" });
addLesson({ courseId: 2, professorId: 2, classroomNumber: "102", dayOfWeek: "Tuesday", timeSlot: "10:15-11:45" });


console.log("Вільні аудиторії в понеділок з 8:30 до 10:00:", findAvailableClassrooms("8:30-10:00", "Monday"));

console.log("Розклад професора John Smith:", getProfessorSchedule(1));

console.log("Завантаженість аудиторії 101:", getClassroomUtilization("101"), "%");

console.log("Найпопулярніший тип занять:", getMostPopularCourseType());

if (reassignClassroom(1, "102")) {
    console.log("Аудиторія для заняття з ідентифікатором 1 була успішно змінена на 102.");
} else {
    console.log("Зміну аудиторії для заняття з ідентифікатором 1 не вдалося виконати.");
}

cancelLesson(1);
console.log("Заняття з ідентифікатором 1 скасовано.");
