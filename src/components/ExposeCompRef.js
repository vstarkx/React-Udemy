import React from 'react'
// Don't change the name of the 'App' 
// function and keep it a named export
import './style25.css'

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

