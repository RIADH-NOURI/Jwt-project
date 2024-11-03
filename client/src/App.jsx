// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import ProtectedData from './components/ProtectedPage';

function App() {
    return (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/Protected" element={<ProtectedData />} />
                </Routes>
    );
}

export default App;
