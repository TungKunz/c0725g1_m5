import {Component} from "react";

class TodoListComponent extends Component{
    constructor(props) {
        super(props);
        this.state={
            list:[],
            item:""
        };
    }
    handleChange =(event) =>{
        this.setState({item:event.target.value})
    }
    handleAddItem = () =>{
        const {item,list} = this.state;
        if(item.trim() !== ""){
            this.setState(
                {
                    list:[...list,item],
                    item:""
                }
            )
        }
    }
    render() {
        return(
            <>
                <div>
                    <h1>Todo List</h1>
                    <input onChange={this.handleChange} type={"text"} value={this.state.item} />
                    <button onClick={this.handleAddItem}>Lưu</button>
                    <ul>
                        {this.state.list.map((todo,index)=>(
                            <li key={index}>{todo}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
    }

}
export default TodoListComponent;