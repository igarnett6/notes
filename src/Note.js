import React from "react"


class Note extends React.Component {
    constructor(){
        super()
        this.state = {
            title: "default title",
            content: "default content",
            backgroundColor: "#f0f7fb",
            leftBorderColor: "solid 4px #3498db",
            category: "cat from state",
            hover: false,
            selected: false,
            selectable: false,
            noteIndex: null
        }
        this.toggleHover = this.toggleHover.bind(this)
        this.toggleSelected = this.toggleSelected.bind(this)
    }
    componentDidMount() {
        this.setState({
            title: this.props.title,
            content: this.props.content,
            category: this.props.category,
            selectable: this.props.selectable,
            noteIndex: this.props.noteIndex
        })
    }
    componentDidUpdate(){
      if(this.state.selectable != this.props.selectable){
        this.setState({
          selectable: !this.state.selectable,
        })
      }
      if(this.state.title!=this.props.title || this.state.content!= this.props.content){
        this.setState({
          title: this.props.title,
          content: this.props.content,
          category: this.props.category,
        })
        this.toggleSelected()
      }
    }
    toggleHover(){
        this.setState({hover: !this.state.hover})
    }
    toggleSelected(){
        if(this.props.selectable){
            this.setState({selected: !this.state.selected})
            this.props.selectNote(this.state)
        }
        else{
          if(this.state.selected===true){
            this.setState({selected: false})
            this.props.selectNote({
              title: "",
              content: "",
              selectedKey: null
            })
          }
        }
    }
    render(){
        var noteStyling
        if(this.state.hover && !this.state.selected){
                noteStyling = {
                    backgroundColor: this.state.backgroundColor,
                    borderLeft: this.state.leftBorderColor,
                    lineHeight: "18px",
                    overflow: "hidden",
                    padding: "12px",
                    maxWidth: "300px",
                    paddingBottom: "7px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                    borderRadius: "10px",
                    transition: "all 0.2s ease-in-out"
            }
        }
        else if(this.state.selected){
            noteStyling = {
                backgroundColor: this.state.backgroundColor,
                borderLeft: this.state.leftBorderColor,
                lineHeight: "18px",
                overflow: "hidden",
                padding: "12px",
                maxWidth: "300px",
                paddingBottom: "7px",
                boxShadow: "0 4px 8px 0 black, 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                borderRadius: "10px",
                transition: "all 0.2s ease-in-out"
            }
        }
        else{
                noteStyling = {
                    backgroundColor: this.state.backgroundColor,
                    borderLeft: this.state.leftBorderColor,
                    lineHeight: "18px",
                    overflow: "hidden",
                    padding: "12px",
                    maxWidth: "300px",
                    paddingBottom: "7px",
                    borderRadius: "10px",
                    transition: "all 0.2s ease-in-out"
            }
        }
        return(
            <div
              onMouseEnter={this.toggleHover}
              onMouseLeave={this.toggleHover}
            >
                <br />
                 <div
                   style={noteStyling}
                   onClick={this.toggleSelected}
                 >
                    <h3>{this.state.title}</h3>
                    <p>{this.state.content}</p>
                    <p><i>{this.state.category}</i></p>
                </div>
            </div>

        )
    }
}export default Note
