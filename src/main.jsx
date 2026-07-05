import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Dismiss the inline preloader once React has painted. Keep it up just long
// enough (min 1s from navigation start) for the intro animation to finish.
requestAnimationFrame(() => {
  const preloader = document.getElementById('preloader')
  if (!preloader) return
  const MIN_VISIBLE_MS = 1000
  const delay = Math.max(0, MIN_VISIBLE_MS - performance.now())
  setTimeout(() => {
    preloader.classList.add('preloader-done')
    setTimeout(() => preloader.remove(), 600)
  }, delay)
})
