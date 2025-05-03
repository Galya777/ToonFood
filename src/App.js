import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home'
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
  return (
  <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" exact={true} components={<Home />}/>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
