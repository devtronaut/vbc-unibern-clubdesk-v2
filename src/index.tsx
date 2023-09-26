import { createRoot } from 'react-dom/client';
import { App } from './wwwfiles/App';
import './style.css';

const refNode = document.querySelector('.cd-group-contact-list');
const rootDiv = document.createElement('div');
rootDiv.id = 'root';
refNode?.before(rootDiv);

const root = createRoot(rootDiv);
root.render(<App teamId={window.teamId} teamName={window.teamName} />);