import React, { useState } from 'react';
import "./Todo.css";
import { List, ListItem, ListItemText, ListItemAvatar, Button, Modal } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

function Todo(props) {

    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const [input, setInput] = useState();

    const handleOpen = () => { 
        setOpen(true);
    }

    const updateTodo =() => {
        //update the todo with the new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, { merge: true })    
        setOpen(false);
    }

    return (
        <>
        <Modal open={open} onClose={e => setOpen(false)}>
            <div className={classes.paper}>
                <h1>open</h1>
                <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                <Button onClick={updateTodo}>Update to do</Button>
            </div>
        </Modal>
        <List className="todo">
            <ListItem>
                <ListItemAvatar>
                </ListItemAvatar>
                <ListItemText primary={props.todo.todo} secondary="Deadline" />
            </ListItem>
            <button className="edit" onClick={e => setOpen(true)}>Edit</button>
            <DeleteForeverIcon className="delete" onClick={event => db.collection('todos').doc(props.todo.id).delete() }></DeleteForeverIcon>
            <Button/> 

        </List>
        </>
    )
}

export default Todo
