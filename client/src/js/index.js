import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import header from './header'; // Import the header variable from the header.js file

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

if (typeof editor === 'undefined') {
  loadSpinner();
}

// Assuming you have a DOM element with an ID 'header-container' to display the header
const headerContainer = document.getElementById('header-container');
headerContainer.textContent = header;

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
