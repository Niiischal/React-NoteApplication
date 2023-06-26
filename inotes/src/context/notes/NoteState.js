import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState =  (props)=>{
    const initialNotes= [
        {
          "_id": "6492e83ae44bd3baab5971c0",
          "user": "6492a96a784d1bdf9425840a",
          "title": "Futsal",
          "description": "friday night maybe",
          "tag": "personal",
          "date": "2023-06-21T12:08:26.526Z",
          "__v": 0
        }
      ]
    const[notes, setNotes]= useState(initialNotes)

    // Add a note
    const addNote=(title, description, tag)=>{
      // TODO: API call
      const note=        {
        "_id": "6492e83ae45bd3baab5971c0",
        "user": "6492a96a784d1bdf9425840a",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2023-06-21T12:08:26.526Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    const deleteNote=(id)=>{
      const newNotes=notes.filter((note)=>{return note._id!==id})
      setNotes(newNotes)
    }

    const editNote=()=>{

    }
    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;