import { render } from 'react-dom';
import { App } from './wwwfiles/App';
import './style.css';

render(<App teamId={window.teamId} />, document.getElementById('root'));