import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MovieList from './pages/MovieList';
import MovieForm from './pages/MovieForm';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/new" element={<MovieForm />} />
            <Route path="/edit/:id" element={<MovieForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App;