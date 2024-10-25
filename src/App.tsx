// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
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


const App: React.FC = () => {
	return (
		<RoleProvider>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route path="/login" element={<LoginPage />} />
				{/* Admin Routes */}
				<Route element={<ProtectedRoute allowedRole={Role.Admin} />}>
					<Route element={<AdminLayout />}>
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/page-one" element={<PageOne />} />
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/class" element={<AdminClassPage />} />
						<Route path="/admin/document" element={<AdminDocumentPage />} />
					</Route>
				</Route>
	return (
		<RoleProvider>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/unauthorized" element={<Unauthorized />} />
				<Route path="/login" element={<LoginPage />} />
				{/* Admin Routes */}
				<Route element={<ProtectedRoute allowedRole={Role.Admin} />}>
					<Route element={<AdminLayout />}>
						<Route path="/admin" element={<AdminPage />} />
						<Route path="/admin/page-one" element={<PageOne />} />
						<Route path="/admin/dashboard" element={<AdminDashboard />} />
						<Route path="/admin/class" element={<AdminClassPage />} />
						<Route path="/admin/document" element={<AdminDocumentPage />} />
					</Route>
				</Route>

				{/* User Routes */}
				<Route element={<ProtectedRoute allowedRole={Role.User} />}>
					<Route element={<UserLayout />}>
						<Route path="/user" element={<UserPage />} />
						{/* <Route path="/user/page-one" element={<PageOne />} /> */}
						<Route path="/user/books" element={<UserBookList />} />
						<Route path='/user/reading-books' element={<UserBookReadingList />} />
						<Route path="/user/reading-books/book/:id" element={<BookDetailPage />} />
						<Route path="/user/assignments" element={<AssignmentPage />} />
						<Route path="/user/assignments/:id" element={<AssignmentDetailPage />} />
					</Route>
				</Route>
				{/* User Routes */}
				<Route element={<ProtectedRoute allowedRole={Role.User} />}>
					<Route element={<UserLayout />}>
						<Route path="/user" element={<UserPage />} />
						{/* <Route path="/user/page-one" element={<PageOne />} /> */}
						<Route path="/user/books" element={<UserBookList />} />
						<Route path='/user/reading-books' element={<UserBookReadingList />} />
						<Route path="/user/reading-books/book/:id" element={<BookDetailPage />} />
						<Route path="/user/assignments" element={<AssignmentPage />} />
						<Route path="/user/assignments/:id" element={<AssignmentDetailPage />} />
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
	);
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
	);
};

export default App;
