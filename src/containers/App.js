import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import { robots } from '../robots';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';


class App extends React.Component{
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
            .then( response => {
                return response.json();
            })
            .then( users => {
                this.setState({robots: users})
            })
    }
    //use arrow function because the this in normal function points to the scope where the function is called
    onSearchChange = (event) => {
        this.setState({searchField: event.target.value});
    }
    render() {
        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter( robot => 
            robot.name.toLowerCase().includes(searchField.toLowerCase())
        )
        if( robots.length === 0) {
            return (
                <h1>Loading...</h1>
            )
        } else {            
            return (
                <div className="tc">
                    <h1 className="f1">RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;