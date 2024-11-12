import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import ExerciseShowcase from './pages/ExerciseShowcase';
import ExercisePage from './pages/ExercisePage';
import NotFound from './pages/NotFound';

const exercises = [
  { id: 16, title: 'Exercise 16', description: 'Feedback Form', component: 'FeedbackForm' },
  { id: 22, title: 'Exercise 22', description: 'Workout Timer', component: 'WorkoutTimer' },
];

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Exercise Showcase</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/exercises">Exercises</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<ExerciseShowcase exercises={exercises} />} />
          <Route path="/exercise/:id" element={<ExercisePage exercises={exercises} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;