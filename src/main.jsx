import { createRoot } from 'react-dom/client'
import StatusLine from './components/StatusLine.jsx'
import App from './components/App.jsx'
import Task from './components/Task.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <StatusLine />
    <Task />
  </>
)

