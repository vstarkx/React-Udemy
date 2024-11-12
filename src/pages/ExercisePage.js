import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import FeedbackForm from '../components/FeedbackForm';
import WorkoutTimer from '../components/WorkoutTimer';

const ExercisePage = ({ exercises }) => {
  const { id } = useParams();
  const exercise = exercises.find(ex => ex.id === parseInt(id));

  if (!exercise) {
    return <Navigate to="/not-found" />;
  }

  const ExerciseComponent = {
    FeedbackForm,
    WorkoutTimer
  }[exercise.component];

  return (
    <section className="exercise-page">
      <h2>{exercise.title}</h2>
      <p>{exercise.description}</p>
      <ExerciseComponent />
    </section>
  );
};

export default ExercisePage;