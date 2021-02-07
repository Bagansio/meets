import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import tasks from './sample/tasks.json'

//Components
import Tasks from './components/Tasks';
import TaskForm from './components/TaskForm';
import Posts from './components/Posts';
import UserLogged from './components/UserLogged';

class App extends Component {

  state = {
    tasks: tasks
  }



  addTask = (title, description) => {
    
    const newTask = {
      title: title,
      description: description,
      id: this.state.tasks.length
    }
    this.setState({
      tasks: [...this.state.tasks, newTask]
    })
  }


  deleteTask = (id) => {
    const newTasks = this.state.tasks.filter(task => task.id !== id);
    this.setState({tasks: newTasks});
  }

  checkDone = id => {
    const newTasks = this.state.tasks.map(task => {
      if(task.id === id){
        task.done = !task.done;
      }
      return task;
    })
    this.setState({tasks: newTasks});
  }

  render() {
    return <div>
      <Router>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/posts">Posts</Link>
        <br/>
        <Link to="/test">test</Link>
        <br/>
        
        <Route exact path="/" render={ () => {
          return <div>
            <TaskForm addTask={this.addTask}/>
            <Tasks 
                tasks={this.state.tasks} 
                deleteTask={this.deleteTask} 
                checkDone={this.checkDone}
            />
          </div>
        }}>
        </Route>
        <Route component={UserLogged}/> 
        <Route path="/posts" component={Posts} />
      </Router>
      
    </div>
  }
}


export default App;
