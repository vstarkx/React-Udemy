import React from "react";
import './forward.css'
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

