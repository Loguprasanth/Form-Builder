// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import PreviewPage from './pages/PreviewPage';
import MyFormsPage from './pages/MyFormsPage';
import Header from "../src/components/FormBuilder/Header";


export default function App() {
  return (
    <Router>
      {/* Common header for all pages */}
      <Header />
      <Routes>
        {/* Redirect root to /myforms */}
        <Route path="/" element={<Navigate to="/create" replace />} />
        
        {/* Main pages */}
        <Route path="/create" element={<CreatePage />} />
        <Route path="/preview/:id" element={<PreviewPage />} />
        <Route path="/myforms" element={<MyFormsPage />} />

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}
