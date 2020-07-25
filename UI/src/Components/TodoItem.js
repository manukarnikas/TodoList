import React,{Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component{
    render(){
        return (
            <div >
               
                <input 
                style={{height:'1.5em',width:'1.5em'}} 
                className="fontstyle"
                type="checkbox" onChange={()=>this.props.handleChange(this.props.listItem)} 
                checked={this.props.listItem.completed}
                disabled={this.props.listItem.completed}
                /> 

                &ensp;

                <p 
                style={{display:'inline',fontSize:'1.5em'}} 
                className={this.props.listItem.completed?'strike':''}>
                {this.props.listItem.task}
                </p>

                <span onClick={()=>{this.props.delItem(this.props.listItem)}}>
                <i  className="fas fa-trash trash"></i>
                </span>

                <hr />
            </div>
        );
    }
}

export default TodoItem;