import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '../pages1/Register';
import Login from '../pages1/Login';
import Dashboard from '../pages1/Dashboard';
import CategoryManagement from '../pages1/CategoryManagement';
import ProtectedRoute from '../components1/ProtectedRoute';
import CreateTest from '../pages1/CreateTest.tsx';
import TestManagement from '../pages1/TestManagement.tsx';
import QuizTest from '../pages1/QuizTest.tsx';
import ProfilePage from '../components1/ProfilePage.tsx';
import ProfileAdmin from '../components1/ProfileAdmin.tsx';
import StudentManagement from '../pages1/StudentManagement.tsx';
import CourseManagement from '../pages1/CourseManagement.tsx';
import LessonPage from '../pages1/LessonPage.tsx';
import AddDataForLesson from '../pages1/AddDataForLesson.tsx';
import { HomePage } from '../pages1/HomePage.tsx';
import BubbleGame from '../pages1/BubbleGame.tsx';
import WatchTimer from '../pages1/WatchTimer.tsx';
import Weather from '../pages1/Weather.tsx';
import NoteBoard from '../pages1/NoteBoard.tsx';
import LessonPage1 from '../pages1/LessonPage1.tsx';
import { Video1 } from '../components2/Video1.tsx';
import { Video2 } from '../components2/Video2.tsx';
import {NewVoca} from '../components2/NewVoca.tsx';
import AllCourse from '../components2/AllCourse.tsx';
import Introduce from '../pages1/Introduce.tsx';
import KaiwaAIChat from '../pages1/KaiwaAIChat.tsx';
import NoteBook from '../pages1/NoteBook.tsx';
import Calculate from '../pages1/Calculate.tsx';
import { FeedbackForm } from '../pages1/FeedbackForm.tsx';
import { Infor, Infor1, Infor10, Infor11, Infor2, Infor3, Infor4, Infor5, Infor6, Infor7, Infor8, Infor9 } from '../pages1/Infor.tsx';
import FinalTest from '../components2/FinalTest.tsx';
import { NotFound } from '../pages1/NotFound.tsx';
import Hiragana from '../components2/Hiragana.tsx';
import Katakana from '../components2/Katakana.tsx';
import CountNumber from '../components2/CountNumber.tsx';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/homePage"
                    element={
                        <ProtectedRoute>
                            <HomePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bubbleGame"
                    element={
                        <ProtectedRoute>
                            <BubbleGame />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/watchTimer"
                    element={
                        <ProtectedRoute>
                            <WatchTimer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/weather"
                    element={
                        <ProtectedRoute>
                            <Weather />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/noteBoard"
                    element={
                        <ProtectedRoute>
                            <NoteBoard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/noteBook"
                    element={
                        <ProtectedRoute>
                            <NoteBook />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/calculate"
                    element={
                        <ProtectedRoute>
                            <Calculate />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/introduce"
                    element={
                        <ProtectedRoute>
                            <Introduce />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/hiragana"
                    element={
                        <ProtectedRoute>
                            <Hiragana />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/katakana"
                    element={
                        <ProtectedRoute>
                            <Katakana />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/countNumber"
                    element={
                        <ProtectedRoute>
                            <CountNumber />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/finalTest"
                    element={
                        <ProtectedRoute>
                            <FinalTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/feedbackForm"
                    element={
                        <ProtectedRoute>
                            <FeedbackForm />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor"
                    element={
                        <ProtectedRoute>
                            <Infor />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor1"
                    element={
                        <ProtectedRoute>
                            <Infor1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor2"
                    element={
                        <ProtectedRoute>
                            <Infor2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor3"
                    element={
                        <ProtectedRoute>
                            <Infor3 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor4"
                    element={
                        <ProtectedRoute>
                            <Infor4 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor5"
                    element={
                        <ProtectedRoute>
                            <Infor5 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor6"
                    element={
                        <ProtectedRoute>
                            <Infor6 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor7"
                    element={
                        <ProtectedRoute>
                            <Infor7 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor8"
                    element={
                        <ProtectedRoute>
                            <Infor8 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor9"
                    element={
                        <ProtectedRoute>
                            <Infor9 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor10"
                    element={
                        <ProtectedRoute>
                            <Infor10 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/infor11"
                    element={
                        <ProtectedRoute>
                            <Infor11 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/video"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/flashcard"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/test"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/slide"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/book"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/audio"
                    element={
                        <ProtectedRoute>
                            <Video1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/video2"
                    element={
                        <ProtectedRoute>
                            <Video2 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/newVoca"
                    element={
                        <ProtectedRoute>
                            <NewVoca />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/kaiwaAIChat"
                    element={
                        <ProtectedRoute>
                            <KaiwaAIChat />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/lesson/:courseId"
                    element={
                        <ProtectedRoute>
                            <LessonPage1 />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/allCourse"
                    element={
                        <ProtectedRoute>
                            <AllCourse />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profilePage"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profileAdmin"
                    element={
                        <ProtectedRoute>
                            <ProfileAdmin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categoryManagement"
                    element={
                        <ProtectedRoute>
                            <CategoryManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/testManagement"
                    element={
                        <ProtectedRoute>
                            <TestManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/studentManagement"
                    element={
                        <ProtectedRoute>
                            <StudentManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/courseManagement"
                    element={
                        <ProtectedRoute>
                            <CourseManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/lesson/:courseId"
                    element={
                        <ProtectedRoute>
                            <LessonPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/addDataForLesson/:courseId/:lessonId"
                    element={
                        <ProtectedRoute>
                            <AddDataForLesson  />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/createTest"
                    element={
                        <ProtectedRoute>
                            <CreateTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/createTest/:id"
                    element={
                        <ProtectedRoute>
                            <CreateTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizTest/:id"
                    element={
                        <ProtectedRoute>
                            <QuizTest />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quizExam/:id"
                    element={
                        <ProtectedRoute>
                            <QuizTest />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};