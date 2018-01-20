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
                <section id="container">
                    <div className="wrapper">
                        <div className="flex-wrap">
                            <Content />
                            <Sidebar />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
};

export default App;
