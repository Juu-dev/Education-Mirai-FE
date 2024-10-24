import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '.';
import LoginPage from '../auth/LoginPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<SignupPage />}> */}
      </Routes>
    </Router>
  );
};

export default App;
