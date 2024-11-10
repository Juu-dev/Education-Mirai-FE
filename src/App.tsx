// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import {Routes, Route} from 'react-router-dom';
import { RoleProvider } from './context/RoleContext';
import Unauthorized from './pages/auth/Unauthorized';
import ProtectedRoute from './components/route/ProtectedRoute';
import { Role } from './constants/roles/routes';
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
import AdminDashboard from './pages/admin/AdminDashboardPage';
import AdminClassPage from './pages/admin/AdminClassPage';
import AdminDocumentPage from './pages/admin/AdminDocumentPage';
import LibraryStatisticalPage from './pages/librarian/LibraryStatisticalPage';
import LibrarianDocumentPage from './pages/librarian/LibrarianDocumentPage';
import { LibrarianAddBookPage } from './pages/librarian/LibrarianAddBookPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage'
import AuthProvider from "./context/AuthContext";

const App: React.FC = () => {
	return (
		<Router>
			<AuthProvider>
				<RoleProvider>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/unauthorized" element={<Unauthorized />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignUpPage />} />
						{/* Principal Routes */}
						<Route element={<ProtectedRoute allowedRole={Role.Principal} />}>
							<Route element={<AdminLayout />}>
								<Route path="/principal" element={<AdminPage />} />
								<Route path="/principal/page-one" element={<PageOne />} />
								<Route path="/principal/dashboard" element={<AdminDashboard />} />
								<Route path="/principal/class" element={<AdminClassPage />} />
								<Route path="/principal/document" element={<AdminDocumentPage />} />
							</Route>
						</Route>
						{/*.Teacher Routes */}
						<Route element={<ProtectedRoute allowedRole={Role.Teacher} />}>
							<Route element={<AdminLayout />}>
								<Route path="/teacher" element={<AdminPage />} />
								<Route path="/teacher/page-one" element={<PageOne />} />
								<Route path="/teacher/dashboard" element={<AdminDashboard />} />
								<Route path="/teacher/class" element={<AdminClassPage />} />
								<Route path="/teacher/document" element={<AdminDocumentPage />} />
							</Route>
						</Route>
						{/* Student Routes */}
						<Route element={<ProtectedRoute allowedRole={Role.Student} />}>
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
						<Route element={<ProtectedRoute allowedRole={Role.Librarian} />}>
							<Route element={<AdminLayout />}>
								<Route path="/librarian/dashboard" element={<AdminDashboard />} />
								<Route path="/librarian/library" element={<LibraryStatisticalPage />} />
								<Route path="/librarian/document" element={<LibrarianDocumentPage />} />
								<Route path="/librarian/books" element={<LibrarianAddBookPage />} />
							</Route>
						</Route>
					</Routes>
				</RoleProvider>
			</AuthProvider>
		</Router>
	);
};

export default App;
