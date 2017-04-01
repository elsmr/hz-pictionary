import Horizon from '@horizon/client';

const hz = Horizon({ authType: 'token', host: 'localhost:8181', secure: true });

if (!hz.hasAuthToken()) {
  hz.authEndpoint('github')
    .subscribe(
      (endpoint) => {
        window.location.replace(endpoint);
      },
    );
} else {

}
