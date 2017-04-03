import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ProtectedRoute from '../Auth/ProtectedRoute';
import Home from '../Home/Home';
import Room from '../Room/Room';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import { fetchUserAuth } from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    fetchUserAuth();
    this.props.fetchUserAuth();
  }

  render() {
    const { user, history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <Switch>
          <ProtectedRoute
            path="/login"
            redirectUrl="/"
            isAuthorized={!user.isAuthorized}
            render={props => <Login user={user} {...props} />}
          />
          <ProtectedRoute
            path="/profile"
            redirectUrl="/login"
            isAuthorized={user.isAuthorized}
            render={props => <Profile user={user} {...props} />}
          />
          <Route path="/:roomId" render={props => <Room user={user} {...props} />} />
          <Route render={props => <Home user={user} {...props} />} />
        </Switch>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { fetchUserAuth })(App);
