import React,{Component} from 'react';
import './TodoApp.css';
import environment from './environment';
import TodoItem from './Components/TodoItem';

class TodoApp extends Component{
    constructor(){
        super();
        this.state = {
            list:[]
        }

        this.handleChange = this.handleChange.bind(this);
        this.delItem = this.delItem.bind(this);
    }

    /**on init */
    async componentDidMount(){
        let url = environment.url+'todoApp';
        let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            }
          });
        response.json().then(data=>{
           this.setState({
               list: data.result
           });
        })
        .catch(err=>{
            console.log(err);
        })
    }

    /**Add new item to the list */
    async addItem(){
        let item = {};
        item.task =  document.getElementById('newtask').value;
        let url = environment.url+'todoApp';
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
          });
        response.json().then(data=>{
          if(data.result){
             this.setState(prevState=>{
                 let newState = prevState;
                 newState.list.push(data.result);
                 document.getElementById('newtask').value="";
                 return newState;
             })
          }
          else{
              console.log('Add Failed');
          }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    /**handle change event in checkbox */
    async handleChange(CompletedItem){
    CompletedItem.completed = true;
    let url = environment.url+'todoApp/'+CompletedItem.id;
    let response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(CompletedItem)
        });
        response.json().then(data=>{
            if(data['result']){
                 this.setState(prevState=>{
                     let newList = prevState.list.map(item=>{
                         if(item.id===data.result.id){
                             return data.result;
                         }
                         return item;
                     });
                     /**new State */
                     return {
                         list: newList
                     };
                 })
            }
            else{
                console.log('Update Failed!')
            }
         })
         .catch(err=>{
            console.log(err);
        })
    } 

    /**delete Item */
    async delItem(item){
        let id=item.id;
        let url = environment.url+'todoApp/'+id;
        let response = await fetch(url, {
                method: "DELETE",
                mode: "cors",
                cache: "no-cache",
                headers: {
                "Content-Type": "application/json"
                }
            });
            response.json().then(data=>{
                if(data['result']['ok']){
                     this.setState(prevState=>{
                         let newList = prevState.list.filter(item=>{
                            return item.id!==id;
                         });
                         /**new state */
                         return {
                            list: newList
                         };
                     })
                }
                else{
                    console.log('Delete Failed!')
                }
             })
             .catch(err=>{
                console.log(err);
            })
    }

    render(){
        /** List of Tasks */
        console.log('in render ,state',this.state.list);
        let taskList = this.state.list.map(item=>{
            return <TodoItem key={item.id} listItem={item} handleChange={this.handleChange} delItem={this.delItem}/>
        });

        /**Render List of Tasks */
        return (
            <div>
                <div className="card card-style"> 
                    <div className="card-header header">
                        <i style={{float:'left'}} className="fas fa-tasks"></i>
                        to-do list
                    </div>
                    <div className="card-body">
                        <div className="card-title">
                            <input className="line" style={{width:'90%'}} type="text" id="newtask" placeholder="Type Task here"/>
                            <span onClick={()=>{this.addItem()}}>
                                <i className="fas fa-plus-circle fa-2x icon"></i>
                            </span>
                        </div>
                        <div className="card-text">
                            {taskList}
                        </div>
                    </div> 
                </div>
            </div>
        );
    }
} 

export default TodoApp;
