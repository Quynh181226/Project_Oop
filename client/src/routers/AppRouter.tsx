import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Register from "../pages/Register";
import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
import GenreManagement from "../pages/GenreManagement.tsx";
import ProtectedRoute from "../components/ProtectedRoute";
// import CreateTest from "../pages/CreateTest.tsx";
// import TestManagement from "../pages/TestManagement.tsx";
// import QuizTest from "../pages/QuizTest.tsx";
import TimeSlotManagement from "../pages/TimeSlotManagement.tsx";
import ShowDateManagement from "../pages/ShowDateManagement.tsx";
import UserManagement from "../pages/UserManagement.tsx";
import MovieManagement from "../pages/MovieManagement.tsx";
// import {NotFound} from "../pages/NotFound.tsx";
// import MovieDetail from "../pages/MovieDetail.tsx";
import MovieTicketBooking from "../components/MovieTicketBooking.tsx";
// import {LoginAdmin} from "../pages/LoginAdmin.tsx";
import ProfileAdmin from "../pages/ProfileAdmin.tsx";
// import ProtectedRouter from "../components/ProtectedRouter.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
// import GenreManagement from "../pages/GenreManagement.tsx";
import Promotion from "../pages/Promotion.tsx";
import PaymentSuccess from "../pages/PaymentSuccess.tsx";
// import HomePage from "../HomePage.tsx"
import Calendar from "../pages/Calendar.tsx";
import News from "../pages/News.tsx";
import NewsDetail from "../pages/NewsDetail.tsx";
import Payment from "../pages/Payment.tsx";
// import Festival from "../pages/Festival.tsx";
import TicketPrice from "../pages/TicketPrice.tsx";
import HomePage from "../pages/HomePage.tsx";
import DashboardManagement from "../pages/DashBoardManagement.tsx";
import Festival from "../pages/Festival.tsx";
import FestivalDetail from "../pages/FestivalDetail.tsx";
// import MovieTicketPage from '../pages/MovieTicketPage';
// import BookingConfirmation from "../components/BookingConfirmation.tsx";
import FestivalManagement from "../pages/FestivalManagement.tsx";
import BookingHistoryManagement from "../pages/BookingHistoryManagement.tsx";
import Policy from "../pages/Policy.tsx";
import Terms from "../pages/Terms.tsx";
import Contact from "../pages/Contact.tsx";
import About from "../pages/About.tsx";
import {FeedbackForm} from "../pages/Feedback.tsx";
import PromotionManagement from "../pages/PromotionManagement.tsx";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                {/*<Route path="/movie/:id" element={<MovieTicketPage />} />*/}
                {/*<Route path="/" element={<HomePage />} />*/}
                <Route path="/login" element={<Login />} />
                <Route path="/categoryManagement"
                       element={
                           <ProtectedRoute>
                               <GenreManagement />
                           </ProtectedRoute>
                       }
                />

                <Route path="/about"
                       element={
                           // <ProtectedRoute>
                               <About />
                           // </ProtectedRoute>
                       }
                />

                <Route path="/timeSlotManagement"
                       element={
                           <ProtectedRoute>
                               <TimeSlotManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/homePage"
                       element={
                           // <ProtectedRoute>
                               <HomePage />
                           // </ProtectedRoute>
                       }
                />
                <Route path="/showDateManagement"
                       element={
                           <ProtectedRoute>
                               <ShowDateManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/userManagement"
                       element={
                           <ProtectedRoute>
                               <UserManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/movieManagement"
                       element={
                           <ProtectedRoute>
                               <MovieManagement />
                           </ProtectedRoute>
                       }
                />

                <Route path="/promotionManagement"
                       element={
                           <ProtectedRoute>
                               <PromotionManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/dashboardManagement"
                       element={
                           <ProtectedRoute>
                               <DashboardManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/festivalManagement"
                       element={
                           <ProtectedRoute>
                               <FestivalManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/bookingHistoryManagement"
                       element={
                           <ProtectedRoute>
                               <BookingHistoryManagement />
                           </ProtectedRoute>
                       }
                />
                <Route path="/festivals" element={<Festival />} />
                <Route path="/festivals/:id" element={<FestivalDetail />} />
                <Route path="/promotion" element={<Promotion/>}/>
                <Route path="/paymentSuccess" element={<PaymentSuccess/>}/>
                {/*<Route path="/movie/:id" element={<MovieDetail />} />*/}
                {/*<Route path="/promotions" element={<Promotion />} />*/}
                <Route path="/payment" element={<Payment />} />
                {/*<Route path="/booking-confirmation" element={<BookingConfirmation />} />*/}
                <Route path="/festivals" element={<Festival />} />
                <Route path="/ticketPrice" element={<TicketPrice />} />
                {/* <Route path="/about" element={<About />} /> */}
                {/*<Route path="/ticketBooking/:movieId"*/}
                {/*       element={*/}
                {/*           // <ProtectedRouter>*/}
                {/*           <MovieTicketBooking />*/}
                {/*           // </ProtectedRouter>*/}
                {/*       }*/}
                {/*/>*/}

                <Route path="/policy" element={<Policy />} />
                <Route path="/terms" element={<Terms />} />

                <Route path="/ticketBooking/:movieId" element={<MovieTicketBooking />} />
                {/*<Route path="/movies/:movieId" element={<MovieTicketBooking />} />*/}
                <Route path="/profileAdmin"
                       element={
                           <ProtectedRoute>
                               <ProfileAdmin />
                           </ProtectedRoute>
                       }
                />
                <Route path="/profilePage"
                       element={
                           <ProtectedRoute>
                               <ProfilePage />
                           </ProtectedRoute>
                       }
                />

                <Route path="/calendar" element={<Calendar />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/feedBack" element={<FeedbackForm />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                <Route path="*"
                       element={
                           <Navigate to="/login" replace />
                       }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;