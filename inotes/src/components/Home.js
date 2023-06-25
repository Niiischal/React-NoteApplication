import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const Home = () => {
  const context = useContext(NoteContext);
  const {notes, setNotes} = context;
  return (
    <div className='container'>
      <h1 style={{textAlign:"center", fontSize:"1.5rem"}}className="my-3">Add Notes: </h1>
      <form>
  <div className="row mb-3">
    <label for="inputEmail3" className="col-sm-2 col-form-label">Email</label>
    <div className="col-sm-10">
      <input type="email" className="form-control" id="inputEmail3"/>
    </div>
  </div>
  <div className="row mb-3">
    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
    <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword3"/>
    </div>
  </div>
  <button type="submit" className="btn btn-primary hover:text-white text-black">Sign in</button>
</form>
<h1 style={{textAlign:"center", fontSize:"1.5rem"}}className="my-3">Your Notes: </h1>
    </div>
    
  )
}

export default Home
