import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CreatePostForm } from './components/CreatePostForm';

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact path="/create-post" component={CreatePostForm} />
                        <Header />
                        <section id="container">
                            <div className="wrapper">
                                <div className="flex-wrap">
                                    <Content />
                                    <Sidebar />
                                </div>
                            </div>
                        </section>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
