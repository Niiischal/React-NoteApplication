import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
  const context = useContext(NoteContext)
  const {deleteNote}= context
    const {note}=props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">
    <h1 className="card-title"> {note.title}:</h1>
    <p className="card-text">{note.description}</p>
    <div className=" my-2 mb-0 d-flex justify-content-around">
    <i className="fa-solid fa-trash mx-5" style={{color: "#ec4b5b"}} onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-5" style={{color: "#3726ba"}}></i>
    </div>
  </div>
</div>
    </div>
  )
}

export default NoteItem
