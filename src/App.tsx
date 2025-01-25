import React from 'react';
import {BrowserRouter as Router, Navigate} from "react-router-dom";
import {Routes, Route} from 'react-router-dom';
import Unauthorized from './pages/auth/Unauthorized';
import ProtectedRoute from './components/route/ProtectedRoute';
import { AdminPage, PageOne } from './pages';
import UserPage from './pages/user';
import HomePage from './pages/homepage';
import UserLayout from './components/layout/UserLayout';
import { UserBookList } from './pages/user/UserBookList';
import { UserBookReadingList } from './pages/user/UserBookReadingList';
import { BookDetailPage } from './pages/user/BookDetailPage';
import { AssignmentPage } from './pages/user/AssginmentPage';
import AssignmentDetail from './pages/assignment/AssignmentDetail.tsx';
import AdminLayout from './components/layout/AdminLayout';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import Class from './pages/class/Class.tsx';
import DocumentPage from './pages/documents/DocumentPage.tsx';
import StatisticalPage from './pages/librarian/StatisticalPage.tsx';
import { AddBookPage } from './pages/librarian/AddBookPage.tsx';
import Request from './pages/request/Request.tsx';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage'
import AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth.ts";
import AssignmentResult from "./pages/assignment/AssignmentResult.tsx";
import ProfilePage from "./pages/profile/ProfilePage.tsx";
import School from "./pages/class/School.tsx";

const App: React.FC = () => {
	const {isAuthenticated} = useAuth()

	return (
		<Router>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/unauthorized" element={<Unauthorized />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					{/* Principal Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<AdminLayout />}>
							<Route path="/principal" element={<Navigate to="/principal/dashboard" replace />} />
							<Route path="/principal/dashboard" element={<Dashboard />} />
							<Route path="/principal/school" element={<School />} />
							<Route path="/principal/class" element={<Class />} />
							<Route path="/principal/document" element={<DocumentPage />} />
							<Route path="/principal/document/:userId" element={<DocumentPage />} />
							<Route path="/principal/request" element={<Request />} />
						</Route>
					</Route>
					{/*.Teacher Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<AdminLayout />}>
							<Route path="/teacher" element={<Navigate to="/teacher/dashboard" replace />} />
							<Route path="/profile" element={<ProfilePage />} />
							<Route path="/teacher/dashboard" element={<Dashboard />} />
							<Route path="/teacher/class" element={<Class />} />
							<Route path="/teacher/document" element={<DocumentPage />} />
							<Route path="/teacher/request" element={<Request />} />
						</Route>
					</Route>
					{/* Student Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<UserLayout />}>
							<Route path="/student" element={<UserPage />} />
							{/* <Route path="/student/page-one" element={<PageOne />} /> */}
							<Route path="/student/books" element={<UserBookList />} />
							<Route path='/student/reading-books' element={<UserBookReadingList />} />
							<Route path="/student/reading-books/book/:id" element={<BookDetailPage />} />
							<Route path="/student/assignments" element={<AssignmentPage />} />
							<Route path="/student/assignments/:id" element={<AssignmentDetail />} />
							<Route path="/student/result" element={<AssignmentResult />} />
						</Route>
					</Route>
					{/* Librarian Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<AdminLayout />}>
							<Route path="/librarian" element={<Navigate to="/librarian/dashboard" replace />} />
							<Route path="/librarian/dashboard" element={<Dashboard />} />
							<Route path="/library" element={<StatisticalPage />} />
							<Route path="/librarian/document" element={<DocumentPage />} />
							<Route path="/librarian/books" element={<AddBookPage />} />
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
