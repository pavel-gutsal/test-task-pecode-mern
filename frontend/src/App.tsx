import React from 'react';
import { Dashboard } from './components/DashBoard';
import { Footer } from './components/Footer';
import { Header } from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default App;
