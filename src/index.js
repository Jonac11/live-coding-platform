import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles.css';

window.changeView = (angle) => {
    alert(`Switching to ${angle}`);
};



ReactDOM.render(<App />, document.getElementById('root'));
