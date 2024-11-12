import React from 'react';
import { Link } from 'react-router-dom';

const ExerciseShowcase = ({ exercises }) => (
  <section className="exercise-showcase">
    <h2>Exercise Showcase</h2>
    <div className="exercise-grid">
      {exercises.map((exercise) => (
        <Link to={`/exercise/${exercise.id}`} key={exercise.id} className="exercise-card">
          <h3>{exercise.title}</h3>
          <p>{exercise.description}</p>
        </Link>
      ))}
    </div>
  </section>
);

export default ExerciseShowcase;