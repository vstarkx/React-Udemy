import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <section className="not-found">
    <h2>404 - Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn">Go Home</Link>
  </section>
);

export default NotFound;