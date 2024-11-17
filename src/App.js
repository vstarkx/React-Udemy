'use client'

import { useState, } from 'react'

import FeedbackForm from './components/FeedbackForm';
import WorkoutTimer from './components/WorkoutTimer';
import { App as ForwardingRef } from './components/ForwardingRef';
import { App as ExposeCompRef } from './components/ExposeCompRef';
import WorkingWithPortal from './components/WorkingWithPortal';
import Project from './components/project/App.jsx';

export default function App() {
  const [activeExercise, setActiveExercise] = useState(null)
  const [activeTab, setActiveTab] = useState('preview')

  const exercises = [
    { id: 16, title: 'Feedback Form', component: <FeedbackForm />, code: feedbackFormCode },
    { id: 22, title: 'Workout Timer', component: <WorkoutTimer />, code: workoutTimerCode },
        { id: 23, title: 'Forwarding Ref', component: <ForwardingRef />, code: ForwardingRefCode },
        { id: 24, title: 'ExposeComp Ref', component: <ExposeCompRef />, code: ExposeCompRefCode },
        { id: 25, title: 'Working with portal', component: <WorkingWithPortal />, code: WorkingWithPortalCode },
        { id: 'Project', title: 'ModalRef', component:<Project /> , code: '' },

    // Add more exercises here
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-800 to-teal-900 text-teal-50 font-sans">
     

      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Exercises</h2>
          <div className="space-y-4">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="bg-gradient-to-r from-teal-400 to-cyan-400 rounded-lg p-4 text-teal-900">
                <h3 className="text-xl font-semibold">{exercise.title}</h3>
                <p className="text-sm mb-2">Exercise {exercise.id}</p>
                <button
                  onClick={() => setActiveExercise(exercise.id)}
                  className="bg-teal-800 text-teal-100 px-4 py-2 rounded hover:bg-teal-700 transition-colors"
                >
                 Show Exercise
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 bg-teal-800 bg-opacity-50 rounded-lg p-6">
          {activeExercise ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                {exercises.find(e => e.id === activeExercise)?.title}
              </h2>
              <div className="mb-4">
                <button
                  className={`px-4 py-2 rounded-tl rounded-tr ${activeTab === 'preview' ? 'bg-teal-600' : 'bg-teal-700'}`}
                  onClick={() => setActiveTab('preview')}
                >
                  Preview
                </button>
                <button
                  className={`px-4 py-2 rounded-tl rounded-tr ${activeTab === 'code' ? 'bg-teal-600' : 'bg-teal-700'}`}
                  onClick={() => setActiveTab('code')}
                >
                  Code
                </button>
              </div>
              <div className="bg-teal-900 rounded p-4">
                {activeTab === 'preview' ? (
                  exercises.find(e => e.id === activeExercise)?.component
                ) : (
                  <pre className="text-sm overflow-x-auto">
                    <code>{exercises.find(e => e.id === activeExercise)?.code}</code>
                  </pre>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-xl text-teal-300">
              Select an exercise to Show
            </div>
          )}
        </div>
      </main>
    </div>
  )
}



const feedbackFormCode = `
import React from 'react';
import '../App.css'
// don't change the Component name "App"
function App() {
   const [textareaV, setTextareaV] = React.useState('');
    const [textinput, setTextinput] = React.useState('');

    return (
        <>
            <section id="feedback">
                <h2>Please share some feedback</h2>
                <p>
                    <label>Your Feedback</label>
                    <textarea onChange={(e) => setTextareaV(e.target.value)} />
                </p>
                <p>
                    <label>Your Name</label>
                    <input type="text" onChange={(e) => setTextinput(e.target.value)} />
                </p>
            </section>
            <section id="draft">
                <h2>Your feedback</h2>

                <Review feedback={textareaV} student={textinput} />

                <p>
                    <button>Save</button>
                </p>
            </section>
        </>
    );
}

function Review({ feedback, student }) {
  return (
    <figure>
      <blockquote>
        <p>{feedback}</p>
      </blockquote>
      <figcaption>{student}</figcaption>
    </figure>
  );
}


export default App;
`

const workoutTimerCode = `
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
`
const ForwardingRefCode = `
import React from "react";
export const userData = {
  name: '',
  email: '',
};

const Input = React.forwardRef(function Input({label,...props},ref)  {
    // Todo: Accept forwarded ref and "connect" it to the <input> element
      return(
      <p className="control">
        <label>{label}</label>
        {/* Todo: "Forward" remaining props to <input> element */}
        <input {...props} ref={ref}  />
      </p>
      );
    });
  
  
export function App() {
  
  const inputRef = React.useRef();
  const inputRef2 = React.useRef();
    
  function handleSaveData() {
    userData.name = inputRef.current.value;
    userData.email = inputRef2.current.value;

    console.log(userData);
    console.log(inputRef.current);
  }
  


  return (
    <div id="app">
      <Input type="text" label="Your Name" ref={inputRef} />
      <Input type="email" label="Your E-Mail" ref={inputRef2} />
      <p id="actions">
        <button onClick={handleSaveData}>Save Data</button>
      </p>
    </div>
  );
}


`
const WorkingWithPortalCode = `
import React from 'react'
import ReactDOM  from 'react-dom';
import './index24.css'
function Toast({ message }) {
  return (ReactDOM.createPortal(
    <aside className="toast" data-testid="toast">
      <p>{message}</p>
    </aside>
  ,document.querySelector('body')))
  ;
}

function WorkingWithPortal() {
  const [showToast,setShowToast] = React.useState(false);

  function handleEnrol() {
    // Todo: Show toast
    setShowToast(true)
    setTimeout(() => {
      // Todo: hide toast
      setShowToast(false)
    }, 3000);
  }

  return (
    <div id="app">
      {/* Todo: Render <Toast /> component (conditionally) here */}
      {showToast &&
      <Toast />}
      <article>
        <h2>React Course</h2>
        <p>
          A course that teaches you React from the ground up and in great depth!
        </p>
        <button onClick={handleEnrol}>Enrol</button>
      </article>
    </div>
  );
}

export default WorkingWithPortal;

`
const ExposeCompRefCode =
`
import React from 'react'
// Don't change the name of the 'App' 
// function and keep it a named export


  // Expose methods to parent via ref


const Form = React.forwardRef((props, ref) => {
      const form = React.useRef();
  React.useImperativeHandle(ref, () => {
    return {
      clear() {
        form.current.reset();
      },
    };
  });
  return (
    <form ref={form}>
      <p>
        <label>Name</label>
        <input type="text"/>
      </p>

      <p>
        <label>Email</label>
        <input type="email" />
      </p>
      <p id="actions">
        <button >Save</button>
      </p>
    </form>
  );
  
})


export function App() {
  const form = React.useRef();
 
  function handleRestart() {
    form.current.clear();
  }
  return (
    <div id="app">
      <button onClick={handleRestart}>Restart</button>
      <Form ref={form} />
    </div>
  );
}


`