// src/App.tsx
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';

import Header from './components/header/Header';
import SignInForm from './pages/auth/SignInForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SIGN_IN, CHATBOT, CHAT_HISTORY } from './constant/navigation';
import ChatBot from './pages/main/chatBot';
import ChatHistory from './pages/main/chatHistory';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!token && location.pathname !== SIGN_IN) {
      navigate(SIGN_IN);
    } else if (token && location.pathname === '/') {
      navigate(CHATBOT);
    }
  }, [location.pathname, navigate, token]);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      {token && <Header />}
      <main>
        <Routes>
          <Route path={SIGN_IN} element={<SignInForm />} />
          <Route path={CHATBOT} element={<ChatBot />} />
          <Route path={CHAT_HISTORY} element={<ChatHistory />} />
        </Routes>
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
