import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1 py-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="py-3 bg-light mt-auto">
          <div className="container text-center">
            <span className="text-muted">Contact Manager &copy; {new Date().getFullYear()}</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;