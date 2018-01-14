import React, { Component } from 'react';
import './App.css';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Sidebar />
                <Content />
            </div>

        );
    }
}

export default App;
