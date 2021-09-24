import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {DataProvider} from './GlobalState'
import Navbar from './components/navbar'
import MainPages from './components/mainpages/Pages'


function App() {
  return (
    <DataProvider>
      <Router>
          <Navbar />
          <MainPages />
      </Router>
    </DataProvider>
  );
}

export default App;
