import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const container = document.querySelector('#root');
if (container) {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>, 
        container
    );
}