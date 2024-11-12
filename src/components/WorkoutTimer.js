import React from 'react';



function Workout({ title, description, time, onComplete }) {
  const [timeRemaining,setTimeRemaining] = React.useState(time);
  const [status,setStatus] = React.useState('start');
  const timer = React.useRef();
    
  function handleStartWorkout() {
    // Todo: Start timer
    timer.current = setInterval(()=>{
     setTimeRemaining((prevTime)=>{
         if(prevTime <= 1){
             clearInterval(timer.current);
             
             onComplete();
             return 0;
         }
         return prevTime - 1;
     })   
    }, time
    )
    setStatus('started');
  }
   


  function handleStopWorkout() {
    // Todo: Stop timer
    clearInterval(timer.current);
    timer.current = null ;
        setStatus('start');

  }

  return (
    <article className="workout">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{timeRemaining}</p>
      <p>
        <button onClick={handleStartWorkout}>{status}</button>
        <button onClick={handleStopWorkout}>Stop</button>
      </p>
    </article>
  );
}
const workouts = [
  {
    title: 'Pushups',
    description: 'Do 30 pushups',
    time: 1000 * 3,
  },
  {
    title: 'Squats',
    description: 'Do 30 squats',
    time: 1000 * 2,
  },
  {
    title: 'Pullups',
    description: 'Do 10 pullups',
    time: 1000 * 1,
  },
];

function App() {
  const [completedWorkouts, setCompletedWorkouts] = React.useState([]);

  function handleWorkoutComplete(workoutTitle) {
    setCompletedWorkouts((prevCompletedWorkouts) => [
      ...prevCompletedWorkouts,
      workoutTitle,
    ]);
  }
  

  return (
    <main>
      <section>
        <h2>Choose a workout</h2>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.title}>
              <Workout
                {...workout}
                onComplete={() => handleWorkoutComplete(workout.title)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Completed workouts</h2>
        <ul>
          {completedWorkouts.map((workoutTitle, index) => (
            <li key={index}>{workoutTitle}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default App;