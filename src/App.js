import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

class App extends Component {
    render() {
        const { posts } =this.props;
        return (
            <div>
              <Header />
              <section id="container">
                <div className="wrapper">
                  <div className="flex-wrap">
                    <Content posts={posts} />
                    <Sidebar />
                  </div>
                </div>
              </section>
            </div>

        );
    }
}

App.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.object
    ),
};

App.defaultProps = {
    posts: [{
        id: 'defaultId',
        caption: 'First Post',
        media: 'http://shmaily.ru/wp-content/uploads/2017/12/GnQp5mpKXfs.jpg.85607ed10e8c58717b411bfdb6956e8e.jpg',
        topic: 'Welcom to new daily-shmaily',
        pubDate: Date.now(),
    }]

};

export default App;
