// src/App.tsx
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
import AssignmentDetailPage from './pages/user/AssignmentDetailPage';
import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/admin/DashboardPage.tsx';
import ClassPage from './pages/class/ClassPage.tsx';
import DocumentPage from './pages/documents/DocumentPage.tsx';
import LibraryStatisticalPage from './pages/librarian/LibraryStatisticalPage';
// import LibrarianDocumentPage from './pages/librarian/LibrarianDocumentPage';
import { LibrarianAddBookPage } from './pages/librarian/LibrarianAddBookPage';
import Request from './pages/request/Request.tsx';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage'
import AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth.ts";

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
							<Route path="/principal" element={<AdminPage />} />
							<Route path="/principal/page-one" element={<PageOne />} />
							<Route path="/principal/dashboard" element={<AdminDashboard />} />
							<Route path="/principal/class" element={<ClassPage />} />
							<Route path="/principal/document" element={<DocumentPage />} />
							<Route path="/principal/document/:teacherID" element={<DocumentPage />} />
							<Route path="/principal/request" element={<Request />} />
						</Route>
					</Route>
					{/*.Teacher Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<AdminLayout />}>
							<Route path="/teacher" element={<AdminPage />} />
							<Route path="/teacher/page-one" element={<PageOne />} />
							<Route path="/teacher/dashboard" element={<AdminDashboard />} />
							<Route path="/teacher/class" element={<ClassPage />} />
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
							<Route path="/student/assignments/:id" element={<AssignmentDetailPage />} />
						</Route>
					</Route>
					{/* Librarian Routes */}
					<Route element={<ProtectedRoute isAllowed={!isAuthenticated} />}>
						<Route element={<AdminLayout />}>
							<Route path="/librarian" element={<Navigate to="/librarian/dashboard" replace />} />
							<Route path="/librarian/dashboard" element={<AdminDashboard />} />
							<Route path="/librarian/library" element={<LibraryStatisticalPage />} />
							<Route path="/librarian/document" element={<DocumentPage />} />
							<Route path="/librarian/books" element={<LibrarianAddBookPage />} />
						</Route>
					</Route>
				</Routes>
			</AuthProvider>
		</Router>
	);
};

export default App;
