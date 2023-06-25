import NoteContext from "./NoteContext";

const NoteState =  (props)=>{
    return (
        <NoteContext.Provider>
            {props.children}
        </NoteContext.Provider>
}