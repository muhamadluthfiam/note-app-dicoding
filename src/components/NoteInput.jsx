import { useState } from "react";
import NoteButton from "./NoteButton";

const NoteInput = ({ addNote }) => {
  const [ note, setNote ] = useState({
    title: '',
    body: ''
  })

  const onTitleChangeEventHandler = (event) =>{
    const setTitle = event.target.value.slice(0, 50)
    setNote({
      ...note,
      title: setTitle
    })
  }
  
  const onTextChangeEventHandler = (event) => {
    const setBody = event.target.value.slice(0, 180)
    setNote({
      ...note,
      body: setBody
    })
  }

  const onSubmitEventHandler = (event) => {
    event.preventDefault();
    if (!note.title || !note.body) return;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    const createdAt = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    const id = +new Date()
    let archived = false
    addNote({
      id,
      ...note,
      createdAt,
      archived
    })
    setNote({
      title: '',
      body: ''
    })
  }


  return (
    <form className="flex flex-col border border-black rounded-lg p-10 self-center mx-8 sm:mx-0" onSubmit={onSubmitEventHandler}>
      <div className="flex flex-col">
        <label htmlFor="title" className="text-right text-[#bebebe]">remainings:<span className="text-black"> { 50 - note.title.length }</span></label>
        <input type="text" className="border border-black rounded-md p-2" placeholder="Title" onChange={onTitleChangeEventHandler} value={note.title} disabled={ (note.title.length === 50) ? true : false }/>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="title" className="text-right text-[#bebebe]">remainings:<span className="text-black"> { 180 - note.body.length }</span></label>
        <textarea placeholder="Notes" value={note.body} cols="30" rows="10" onChange={onTextChangeEventHandler} className="border border-black rounded-md p-2 resize-none" disabled={(note.body.length === 180) ? true : false}></textarea>
      </div>
      <NoteButton />
    </form>
  )
}

export default NoteInput