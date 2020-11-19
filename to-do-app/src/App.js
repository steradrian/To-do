import React, {useState, useEffect} from 'react';
import './App.css';
import { Button, Input, FormControl, InputLabel } from '@material-ui/core';
import Todo from"./Todo";
import db from './firebase';
import firebase from 'firebase';

function App() {
  
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(['']);

  // when the app loads, we need to listen to the database and fetch new todos as they get added/removed

  // useEffect(function, dependancies)
  useEffect (() => {
    // this code fires when the app.js loads
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log(snapshot.docs.map(doc => doc.data()));
    setTodos(snapshot.docs.map(doc =>({id: doc.id, todo: doc.data().todo})))
    })
  }, []);

  const addTodo = (event) => { 
    //This will fire off when we click the button 
    event.preventDefault(); // I will stop refresh

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
      
    });
    setTodos([...todos, input]);
    setInput(''); //Clear input after clicking button or pressing enter
  }

  return (
    <div className="App">
      <h1>To do list</h1>
      <form className="form__input">

     {/*} <input value={input} onChange={event => setInput(event.target.value)}/> */}
          <FormControl  >
            <InputLabel>Write a to do</InputLabel>
            <Input className="form__inputline" value={input} onChange={event => setInput(event.target.value)}/>
          </FormControl>

          <Button className="button__top" disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary">
            Add to do
          </Button>
      {/*<button onClick={addTodo}>Add to do</button> */}

      </form>
      

      <ul className="todos">

        {todos.map(todo => (
          <Todo todo={todo}/>
          // <li>{todo}</li>
        ))}

      </ul>

      
    </div>
  );
}

export default App;
