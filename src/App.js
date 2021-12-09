import {Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateSpecific from './components/State-specific'
import './App.css'

const App = () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/state/:stateCode" component={StateSpecific} />
      <Route path="/bad-path" component={NotFound} />
      <Redirect to="bad-path" />
    </Switch>
  </>
)

export default App
