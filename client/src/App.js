import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Chat from './components/Chat';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/chat/' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
