import { createRoot } from 'react-dom/client';
import { App } from './wwwfiles/App';
import './style.css';

const tablesConfig = window.tables;

const refNode = document.querySelector(
  tablesConfig.referenceElement ?? '.cd-group-contact-list'
);
const rootDiv = document.createElement('div');
rootDiv.id = 'root';
refNode?.before(rootDiv);

const root = createRoot(rootDiv);
root.render(
  <App teamId={tablesConfig.teamId} teamName={tablesConfig.teamName} />
);
