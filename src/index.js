import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewsApp from './components/NewsApp';

ReactDOM.render(
	<NewsApp />,
	document.getElementById('root')
	);

if(module.hot){
	module.hot.accept()
}
