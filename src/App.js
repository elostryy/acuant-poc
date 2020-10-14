import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import CapturePhoto from './screens/CapturePhoto';
import CaptureSelfie from './screens/CaptureSelfie';
import Results from './screens/Results/index';
import Error from './screens/Error/index';
import './styles/main.css';
import ProcessedImageResult from './screens/ProcessedImageResult';
import AcuantReactCamera from './screens/AcuantReactCamera';
import { config } from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAcuantSdkLoaded: false,
    };
    this.isInitialized = false;
    this.isIntializing = false;
  }

  componentDidMount() {
    if (!this.props.config) {
      this.props.routerHistory.replace('/');
    }
    this.loadScript();
  }

  loadScript() {
    window.onAcuantSdkLoaded = () => {
      this.initialize();
    };

    const sdk = document.createElement('script');
    sdk.src = 'AcuantJavascriptWebSdk.min.js';
    sdk.async = true;

    document.body.appendChild(sdk);
  }

  componentDidCatch(error, errorInfo) {
    console.log('error', errorInfo, error);
  }

  initialize() {
    if (!this.isInitialized && !this.isIntializing) {
      this.isIntializing = true;

      window.AcuantJavascriptWebSdk.initialize(
        btoa(`${config.REACT_APP_USER_NAME}:${config.REACT_APP_PASSWORD}`),
        config.REACT_APP_ID_ENDPOINT,
        {
          onSuccess: () => {
            this.isInitialized = true;
            this.isIntializing = false;
            this.setState({
              isAcuantSdkLoaded: true,
            });
          },

          onFail: () => {
            this.isIntializing = false;
            this.setState({
              isAcuantSdkLoaded: true,
            });
          },
        }
      );
    }
  }

  render() {
    return (
      <div className={'mainContent'}>
        {this.state.isAcuantSdkLoaded && (
          <Provider store={this.props.store}>
            <ConnectedRouter history={this.props.routerHistory}>
              <Switch>
                <Redirect exact from="/" to="/capture/photo" />
                <Route path="/capture/photo" exact component={CapturePhoto} />
                <Route
                  path="/capture/camera"
                  exact
                  component={AcuantReactCamera}
                />
                <Route
                  path="/photo/confirm"
                  exact
                  component={ProcessedImageResult}
                />
                <Route path="/capture/selfie" exact component={CaptureSelfie} />
                <Route path="/results" component={Results} />
                <Route path="/error" component={Error} />
              </Switch>
            </ConnectedRouter>
          </Provider>
        )}
      </div>
    );
  }
}

export default App;
