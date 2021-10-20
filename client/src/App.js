// Modules
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Context
import ContactState from './context/contact/ContactState';
// Layouts
import Navbar from './components/layout/Navbar';
// Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
// CSS
import './App.css';

const App = () => {
  return (
    <ContactState>
      <Router>
        <Fragment>
          <Navbar title='Contact Library' />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ContactState>
  );
};

export default App;
