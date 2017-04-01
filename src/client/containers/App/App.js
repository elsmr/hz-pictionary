import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Room from '../Room/Room';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rooms: [] };
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:roomId" component={Room} />
          <Route component={Home} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, {})(App);
