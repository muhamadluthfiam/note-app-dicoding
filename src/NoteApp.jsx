import React from "react";
import NoteInput from "./components/NoteInput";

import { getData } from "./utils/data";
class NoteApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: getData(),
      activeTab: 'active'
    }

    this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
    this.onDeleteNoteHandler = this.onDeleteNoteHandler.bind(this)
    this.changeTab = this.changeTab.bind(this)
  }
  onAddNoteHandler ({ id, title, body, archived, createdAt }) {
    this.setState((prevState) => {
      return {
        notes: [
          ...prevState.notes,
          {
            id,
            title,
            body,
            archived,
            createdAt
          }
        ]
      }
    })
  }

  onDeleteNoteHandler(id) {
    this.setState((prevState) => {
      return {
        notes: prevState.notes.filter((note) => note.id !== id),
      };
    });
  }

  changeDateFormat(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  changeTab(tab) {
    this.setState({ activeTab: tab });
  }

  archiveNoteHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: true };
        }
        return note;
      });

      return {
        notes: updatedNotes,
      };
    });
  }

  unarchiveNoteHandler(id) {
    this.setState((prevState) => {
      const updatedNotes = prevState.notes.map((note) => {
        if (note.id === id) {
          return { ...note, archived: false };
        }
        return note;
      });

      return {
        notes: updatedNotes,
      };
    });
  }

  render() {
    const { notes, activeTab } = this.state;
    const activeNotes = notes.filter((note) => !note.archived);
    const archivedNotes = notes.filter((note) => note.archived);
    return (
      <main className="lg:px-24">
        <div className="text-center my-5 lg:hidden">
          <h3 className="text-3xl font-medium">Notes.</h3>
          <p className="text-base font-extralight text-[#bebebe] italic">Make your simple notes.</p>
        </div>
        <section className="flex flex-wrap lg:mt-5 relative">
          <div className="lg:fixed lg:inset-y-0 lg:left-5 lg:top-20 w-full lg:w-4/12 self-center items-center mx-8 lg:mx-0">
            <NoteInput addNote={this.onAddNoteHandler}/>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:-right-10 w-full lg:w-8/12">
            <div className="hidden lg:block text-center my-5">
              <h3 className="text-3xl font-medium">Notes.</h3>
              <p className="text-base font-extralight text-[#bebebe] italic">Make your simple notes.</p>
            </div>
            <div className="mt-5 border border-black rounded-md p-10 mx-8 lg:mx-0">
              <div className="border border-black flex rounded-lg shadow-md">
                <button
                  onClick={() => this.changeTab('active')}
                  className={`w-16 flex justify-center self-center py-1 hover:bg-green-600 hover:text-white font-semibold text-sm ${
                    activeTab === 'active' ? 'bg-green-600 text-white' : ''
                  }`}
                >
                  Active
                </button>
                <hr className="w-[1px] h-auto bg-black"/>
                <button
                  onClick={() => this.changeTab('archive')}
                  className={`w-16 flex justify-center self-center py-1 hover:bg-green-600 hover:text-white font-semibold text-sm ${
                    activeTab === 'archive' ? 'bg-green-600 text-white' : ''
                  }`}
                >
                  Archive
                </button>
              </div>
              {activeTab === 'active' && (
                <div className="flex flex-wrap justify-center gap-5 mt-10">
                  {activeNotes.map((note) => (
                    <div key={note.id} className="w-full lg:w-5/12 border border-black p-5 rounded-md">
                      <h2>{note.title}</h2>
                      <p className="text-[#a3a3a3]">{this.changeDateFormat(note.createdAt)}</p>
                      <h4>{note.body}</h4>
                      <div className="flex gap-4 justify-start mt-3">
                        <button className="px-2 py-1 border border-black rounded-md hover:bg-green-400 hover:text-white" onClick={() => this.onDeleteNoteHandler(note.id)}>Hapus</button>
                        <button className="px-2 py-1 border border-black rounded-md hover:bg-green-400 hover:text-white" onClick={() => this.archiveNoteHandler(note.id)}>Arsipkan</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === 'archive' && (
                <div className="flex flex-wrap justify-center gap-5 mt-10">
                  {archivedNotes.map((note) => (
                    <div key={note.id} className="w-full lg:w-5/12 border border-black p-5">
                      <h2>{note.title}</h2>
                      <p className="text-[#a3a3a3]">{this.changeDateFormat(note.createdAt)}</p>
                      <h4>{note.body}</h4>
                      <div className="flex gap-4 justify-start mt-3">
                        <button className="px-2 py-1 border border-black rounded-md hover:bg-green-400 hover:text-white" onClick={() => this.unarchiveNoteHandler(note.id)}>Active</button>
                        <button className="px-2 py-1 border border-black rounded-md hover:bg-green-400 hover:text-white" onClick={() => this.onDeleteNoteHandler(note.id)}>Hapus</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
        
      </main>
    )
  }
}

export default NoteApp