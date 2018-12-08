import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as __ACTION_NAME__Actions from './actions';

class __COMPONENT_NAME__ extends Component {
  render() {
    return (
      <h1>__COMPONENT_NAME__ component</h1>
    );
  }
}

function mapStateToProps(state) {
  return {
    __ACTION_NAME__: state.__ACTION_NAME__
  };
}

export default connect(
  mapStateToProps,
  __ACTION_NAME__Actions
)(__COMPONENT_NAME__);
