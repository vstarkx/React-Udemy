import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="home">
    <h2>Welcome to the Exercise Showcase</h2>
    <p>This application demonstrates various React exercises and components.</p>
    <Link to="/exercises" className="btn">View Exercises</Link>
  </section>
);

export default Home;