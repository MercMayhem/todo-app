import React, { useState } from "react";
import './App.js';
import './App.css';

function App() {

    return (
            <Todos/>
    );
}

function Todos() {
    
    const [todos, setTodos] = useState([]);
    const [enlarged, setEnlarged] = useState(false);
    const [enlargedText, setEnlargedText] = useState("");

    let submitHandler = (e) => {
        e.preventDefault();
        if (e.target.elements.todo.value !== ""){
            setTodos([...todos, e.target.elements.todo.value]);
            e.target.reset();
        }
    }

    let makeEnlarged = (text) => {
        setEnlargedText(text);
        setEnlarged(true);
    }

    return (
        <>
        <div className="container">
            <div className="form">
                <form onSubmit={submitHandler}>
                    <div align="center"><input name="todo" placeholder="Enter ToDo" className="todo-input" /></div>
                    <div align="center"><button type="submit">Add Todo</button></div>
                </form>
            </div>

           
            <div>
                <ul className="todo-list">
                    { todos.map((todo, index) => 
                        ( <TodoListItem key={index} index={index} setTodos={setTodos} makeEnlarged={makeEnlarged}>
                              { todo }
                          </TodoListItem> )) }
                </ul>
            </div>
        { enlarged ? <TodoEnlarged setEnlarged={setEnlarged} enlargedText={enlargedText}/> : null }
        </div>

        </>
    );
}

function TodoEnlarged({ setEnlarged, enlargedText }) {
    const style = {
        position : "fixed",
        top: 0,
        right: 0,
        background: "white",
        border: "1px dashed black",
        padding: 2,
        display: "flex",
        maxWidth: "15%",
        maxHeight: "70%",
        flexDirection: "column",
        alignItems: "center"
    }

    const emptyDivStyle = {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        background: "black",
        opacity: 0.43,
    }

    const buttonStyle = {
        "margin" : 5,
        height : "3vh",
        width : "7vh",
    }

    const textContainerStyle = {
        margin: 5,
        overflowX: "auto",
        overflowY: "auto",
        whiteSpace: "pre-wrap", 
        textWrap: "pretty",
        overflowWrap: "anywhere" 
    };


    return (
        <>
        <div style = {emptyDivStyle}/>
        <div style={ style }>
            <div style = { textContainerStyle }>{ enlargedText }</div>
            <button onClick= { () => {setEnlarged(false)} } style = { buttonStyle }> Close </button>
        </div>
        </>
    )
}

function TodoListItem(prop) {
    const white = { background: "white" };
    const gray = { background: "lightgrey"};
    const [color, setColor] = useState(white);


    let deleteHandler = (index) => {
        prop.setTodos(prevTodos => prevTodos.filter((_, i) => i !== index));
    }

    return ( 
        <li key={prop.index} style = { color } className="todo-item" onMouseEnter = { () => setColor(gray) } onMouseLeave = { () => setColor(white) } 
            onClick = { (e) => prop.makeEnlarged(prop.children) }>
            <Todo todo={ prop.children } onDelete = { () => deleteHandler(prop.index)} />
        </li>
    )
}

function Todo({ todo, onDelete }) {
    return(
        <>
            <div className="todo-rext" >{todo}</div>
            <div onClick={(e) => e.stopPropagation()}>
                <button className="remove-btn" onClick={onDelete}> Delete </button>
            </div>
        </>
    )    
}

export default App;

