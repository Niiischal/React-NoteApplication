
import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNotes = () => {
    const context = useContext(NoteContext);

    const {addNote} = context;

    const[note, setNote]=useState({title:"", description:"", tag:"default"})

    const handleClick=(e)=>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
          <div className='container'>
      <h1 style={{textAlign:"center", fontSize:"1.5rem"}}className="my-3">Add Notes: </h1>
      <form>
  <div className="row mb-3">
    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="title" name='title' onChange={onChange}/>
    </div>
  </div>
  <div className="row mb-3">
    <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="description" name='description' onChange={onChange}/>
    </div>
  </div>
  <button type="submit" className="btn btn-primary hover:text-white text-black" onClick={handleClick}> Add Notes </button>
</form>
    </div>
    </div>
  )
}

export default AddNotes
