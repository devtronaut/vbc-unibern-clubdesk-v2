import { render } from 'react-dom';
import { App } from './wwwfiles/App';
import './style.css';

const refNode = document.querySelector('.cd-group-contact-list');
const rootDiv = document.createElement('div');
rootDiv.id = 'root';
refNode?.before(rootDiv);

render(<App teamId={window.teamId} teamName={window.teamName} />, document.getElementById('root'));