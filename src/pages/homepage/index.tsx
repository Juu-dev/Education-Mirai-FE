import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate('/login');
  };
  const handleSignUpClick = () => {
    navigate('/signup')
  };
    return (
      <div className="flex min-h-screen w-screen bg-gray-100">
        <div className="flex flex-col flex-grow">
        {/* Header  */}
        <header className="bg-white shadow p-4 items-center">
          
          <div className="flex justify-end">
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md mr-2 transition duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700"
            onClick={handleLoginClick}>
              Đăng nhập  
            </button>  
            <button className="bg-blue-700 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700"
            onClick={handleSignUpClick}>  
              Đăng ký  
            </button>  
          </div>
        </header>
  
         {/* Main Content  */}
        <main className=" flex-col mt-10 pl-10">
          <h2 className="text-gray-400 ml-1">
            Anywhere and Everywhere
          </h2> 
          <h1 className="text-4xl font-bold text-blue-600 ">
            Chào mừng đến với 
          </h1>
          <h1 className="text-4xl font-bold text-blue-600 mb-4">
            Trường Tiểu Học Nam Hà
          </h1>
          <p className="text-lg mb-2">
            Theo dõi việc đọc của bạn và xây dựng thư viện của bạn.
          </p>
          <p className="text-lg">
            Khám phá cuốn sách yêu thích của bạn.
          </p>
          <p className="text-lg">
            Theo dõi tiến độ đọc sách của bạn. 
          </p>
          <p className="text-lg mb-3">
            Đọc sách mọi lúc, mọi nơi.
          </p>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md transition duration-300 ease-in-out hover:bg-white hover:text-blue-700 hover:border hover:border-blue-700">Bắt đầu khám phá</button>
        </main>
  
         {/* Footer  */}
        <footer className="bg-white py-4 w-full text-left text-sm absolute bottom-0 left-0 pl-10">
          <h1 className="mb-2 font-bold text-blue-600 text-xl">Thông tin liên lạc</h1>
          <p>Email: test@gmail.com</p>
          <p>Zalo: 0377xxxxxx</p>
          <div className="flex justify-left space-x-4 mt-2 mb-2 text-blue-600" >
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </footer>
      </div>
      </div>
    );
  }
  
  export default HomePage;
  