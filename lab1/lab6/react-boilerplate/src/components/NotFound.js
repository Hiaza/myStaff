import React from 'react';
import { Header } from 'semantic-ui-react';
import Page from '../Page';
import '../styles/style.css';

const NotFound = () => (
  <Page>
    <div id="notfound">
    <div class="notfound">
        <div class="notfound-404">
            <h1>Oops!</h1>
        </div>
        <h2>404 - Page not found</h2>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
    </div>
    </div>
  </Page>
);

export default NotFound;