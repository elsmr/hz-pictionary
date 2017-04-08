import React from 'react';
import { Toast } from 'grommet';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ProtectedRoute from '../Auth/ProtectedRoute';
import Home from '../Home/Home';
import Room from '../Room/Room';
import Login from '../Auth/Login';
import Profile from '../Profile/Profile';
import PageSpinner from '../../components/PageSpinner';
import { fetchUserAuth, destroyToast } from '../../redux/actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    fetchUserAuth();
    this.props.fetchUserAuth();
  }

  render() {
    const { app, user, history, destroyToast } = this.props;
    if (user.authPending) {
      return <PageSpinner />;
    }
    return (
      <div>
        { app.toast &&
          <Toast
            status={app.toast.status}
            onClose={() => destroyToast()}
          >
            {app.toast.message}
          </Toast>
        }
        <ConnectedRouter history={history}>
          <Switch>
            <ProtectedRoute
              path="/login"
              redirectUrl="/"
              isAuthorized={!user.isAuthorized && !user.authPending}
              render={props => <Login user={user} {...props} />}
            />
            <ProtectedRoute
              path="/profile"
              redirectUrl="/login"
              isAuthorized={user.isAuthorized || user.authPending}
              render={props => <Profile user={user} {...props} />}
            />
            <Route path="/:roomId" render={props => <Room user={user} {...props} />} />
            <Route render={props => <Home user={user} {...props} />} />
          </Switch>
        </ConnectedRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
});

export default connect(mapStateToProps, { fetchUserAuth, destroyToast })(App);
