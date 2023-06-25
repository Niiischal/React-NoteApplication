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
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;