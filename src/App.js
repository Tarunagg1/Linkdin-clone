import Login from './component/Login';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/Home';
import Header from './component/Header';
import {useEffect} from 'react';
import {getUserAuth} from './action';
import { connect } from 'react-redux';


function App(props) {

  useEffect(() => {
    props.getUserAuth();  
  }, [])

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact >
            <Header />
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = (state)=>{
  return {};
}

const mapDispatchToProps = (dispatch)=> ({
  getUserAuth : ()=> dispatch(getUserAuth())
});


export default connect(mapStateToProps,mapDispatchToProps)(App);
