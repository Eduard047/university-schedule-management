"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProfessor = addProfessor;
exports.addLesson = addLesson;
exports.addCourse = addCourse;
exports.findAvailableClassrooms = findAvailableClassrooms;
exports.getProfessorSchedule = getProfessorSchedule;
// Хранилища для данных
var professors = [];
var classrooms = [];
var lessons = [];
var courses = [];
// Функция для добавления профессора
function addProfessor(professor) {
    professors.push(professor);
}
// Функция для добавления занятия
function addLesson(lesson) {
    lessons.push(lesson);
}
// Функция для добавления курса
function addCourse(course) {
    courses.push(course);
}
// Функция для поиска доступных аудиторий
function findAvailableClassrooms(timeSlot, dayOfWeek) {
    // Получаем занятые аудитории по заданному времени и дню
    var occupiedClassrooms = lessons
        .filter(function (lesson) { return lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek; })
        .map(function (lesson) { return lesson.classroomNumber; });
    // Возвращаем только свободные аудитории
    return classrooms.filter(function (classroom) { return occupiedClassrooms.indexOf(classroom.number) === -1; });
}
// Функция для получения расписания профессора
function getProfessorSchedule(professorId) {
    return lessons.filter(function (lesson) { return lesson.professorId === professorId; });
}
