import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LaunchScreen from './screens/LaunchScreen';
import SafetyChecker from './screens/SafetyChecker';
import { ToastNotification } from './components';
import './App.css';

function App() {
  const [toastState, setToastState] = useState({
    visible: false,
    message: '',
  });

  const showToast = (message: string) => {
    setToastState({ visible: true, message });
  };

  const hideToast = () => {
    setToastState({ visible: false, message: '' });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LaunchScreen showToast={showToast} />} />
        <Route path="/safety-checker" element={<SafetyChecker />} />
      </Routes>
      <ToastNotification
        message={toastState.message}
        visible={toastState.visible}
        onClose={hideToast}
      />
    </BrowserRouter>
  );
}

export default App;
