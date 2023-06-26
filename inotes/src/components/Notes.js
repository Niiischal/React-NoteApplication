import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(NoteContext);
    const {notes, setNotes} = context;
  return (
    <div className='row-my-3'>
      <h1 style={{textAlign:"center", fontSize:"1.5rem"}}className="my-3">Your Notes: </h1>
      {notes.map((note)=>{
        return <NoteItem note={note}/>
      })}
    </div>
  )
}

export default Notes