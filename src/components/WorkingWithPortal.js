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
      <Toast message={"Hi this is Notfication"}/>}
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
