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