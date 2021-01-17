import React from "react"
import Note from "./Note"

class NoteControls extends React.Component{
    constructor(){
        super()
        this.state = {
            showAddForm: false,
            showEditForm: false,
            showDeleteForm: false,
            title: "",
            content: "",
            noteSelected: false,
            notes: [],
            selectable: false,
            key: -1,
            selectedKey: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.createNote = this.createNote.bind(this)
        this.noteSelected = this.noteSelected.bind(this)
        this.makeSelectable = this.makeSelectable.bind(this)
        this.editNote = this.editNote.bind(this)
        this.deleteNotes = this.deleteNotes.bind(this)
    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    createNote(event){
        const newNote = {
            title: this.state.title,
            content: this.state.content,
            category: "default category",
            key: this.state.key+1
        }
        const newNotes = [...this.state.notes]
        newNotes.push(newNote)
        this.setState({
            showForm: false,
            title: "",
            content: "",
            notes: newNotes,
            key: this.state.key+1
        })
        this.setState({showAddForm: !this.state.showAddForm})
    }
    editNote(event){
      const newNote = {
          title: this.state.title,
          content: this.state.content,
          category: "default category",
          key: this.state.selectedKey
      }
      const newNotes = [...this.state.notes]
      newNotes[this.state.selectedKey] = newNote
      this.setState({
        notes: newNotes,
        showEditForm: !this.state.showEditForm,
        selectable: false
      })
    }
    deleteNotes(event){
      const newNotes = [...this.state.notes]
      newNotes.splice(this.state.selectedKey, 1)
      this.setState({
        notes: newNotes,
        showDeleteForm: false,
        noteSelected: false
      })
      // this.makeUnselectable()
    }

    noteSelected(childState){
      if(!this.state.noteSelected&&(this.state.showEditForm)){
        this.setState({
          title: childState.title,
          content: childState.content,
          noteSelected: true,
          selectable: !this.state.selectable,
          selectedKey: childState.noteIndex
          // showEditForm: !this.state.showEditForm
        })
      }
      else if(this.state.showDeleteForm){
        this.setState({
          title: childState.title,
          content: childState.content,
          noteSelected: true,
          // selectable: !this.state.selectable,
          selectedKey: childState.noteIndex
        })
      }
      else{
        this.setState({
          title: "",
          content: "",
          noteSelected: !this.state.noteSelected,
          selectedKey: null
        })
      }

    }
    makeSelectable(){
      if(!this.state.selectable){
        this.setState({selectable: true})
      }
    }
    makeUnselectable(){
      if(this.state.selectable){
        this.setState({selectable: false})
      }
    }

    showAddForm = () => {   //display add note menu
        return(
            <div>
                <form id = "add-note">
                    <label>Title:  </label>
                    <input
                        style={{marginRight: "12px"}}
                        name="title"
                        value={this.state.title}
                        type="text"
                        onChange={this.handleChange}
                    />
                    <label>Content:  </label>
                    <textarea
                        style={{verticalAlign: "top",marginRight: "12px"}}
                        name="content"
                        value={this.state.content}
                        type="text"
                        onChange={this.handleChange}
                    />
                    <button type="button" onClick={this.createNote}>Create</button>
                </form>
            </div>
        )
    }
    showEditForm = () => { //displaly edit menu
        if(!this.state.noteSelected){
            this.makeSelectable()
            return(
                <h2>Select a note to edit.</h2>
            )
        }
        else{
          this.makeUnselectable()
            return(
                <div>
                    <form id = "add-note">
                        <label>Title:  </label>
                        <input
                            style={{marginRight: "12px"}}
                            name="title"
                            value={this.state.title}
                            type="text"
                            onChange={this.handleChange}
                        />
                        <label>Content:  </label>
                        <textarea
                            style={{verticalAlign: "top",marginRight: "12px"}}
                            name="content"
                            value={this.state.content}
                            type="text"
                            onChange={this.handleChange}
                        />
                        <button type="button" onClick={this.editNote}>Save Changes</button>
                    </form>
                </div>
            )
        }
    }
    showDeleteForm = () => {
      this.makeSelectable()
      if(!this.state.noteSelected){
        return(
          <h2>Select a note to delete.</h2>
        )
      }
      else{
        // this.makeUnselectable()
        return(
          <div>
            <button onClick={this.deleteNotes}>Delete Selected</button>
          </div>
        )
      }
    }

    render(){
        console.log("rendered from NoteControls.js")
        const notes = this.state.notes.map(
            note =>
            <Note
                key={note.key}
                noteIndex={note.key}
                title={note.title}
                content={note.content}
                selectNote={this.noteSelected}
                selectable={this.state.selectable}
            />
        )
        return(
            <div className="add-note">
                <button  onClick={() => {
                  this.setState(
                    {
                      showAddForm: !this.state.showAddForm,
                      showEditForm: false,
                      showDeleteForm: false
                    })
                    if(this.state.showAddForm){
                      this.setState({
                        title: "",
                        content: ""
                      })
                    }
                }}>Add New Note</button>
                <button onClick={() => {
                  this.setState(
                    {
                      showEditForm: !this.state.showEditForm,
                      showAddForm: false,
                      showDeleteForm: false
                    })
                  }}>Modify Note</button>
                <button
                  onClick={() =>{
                    this.setState({
                      showDeleteForm: !this.state.showDeleteForm,
                      showAddForm: false,
                      showEditForm: false
                    })
                }}>Remove Note</button>
                {this.state.showAddForm ? this.showAddForm() : null}
                {this.state.showEditForm ? this.showEditForm() : null}
                {this.state.showDeleteForm ? this.showDeleteForm(): null}
                <br />
                <br />
                {notes}
            </div>
        )
    }
}export default NoteControls
