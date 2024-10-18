import { Outlet } from 'react-router';
import { Sidebar, CommonHeader } from '../../components/layout';

const UserPage = () => {
	return (
		<div className='flex w-full'>
			<Sidebar />
			<div className='w-full flex flex-col'>
				<CommonHeader />
				<Outlet />
			</div>
		</div>
	);
};

export default UserPage;
