import React from 'react';

const NoteItem = (props) => {
    const {note}=props;
  return (
    <div className='col-md-3'>
      <div className="card my-3">
  <div className="card-body">
    <h1 className="card-title"> {note.title}:</h1>
    <p className="card-text">{note.description}</p>
  </div>
</div>
    </div>
  )
}

export default NoteItem
