import { render } from 'react-dom';
import { App } from './wwwfiles/App';

render(<App teamId={window.teamId} />, document.getElementById('root'));