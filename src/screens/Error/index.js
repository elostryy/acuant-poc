import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import DefaultError from './DefaultError';
import LowResolution from './LowResolution';
import Header from '../Header';

class Error extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Route
          path={`${this.props.match.url}/default`}
          component={DefaultError}
        />
        <Route
          path={`${this.props.match.url}/lowresolution`}
          component={LowResolution}
        />
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Error);
