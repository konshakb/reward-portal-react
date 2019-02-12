import React, { Component } from 'react';
import { connect } from 'react-redux';
export default ChildComponent => {
  class ComposedComponent extends Component {
    // Component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }
    // Component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (!this.props.auth || !this.props.admin) {
        this.props.history.push('/');
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  
  function mapStateToProps(state) {
    return {
        auth: state.auth.authenticated,
        admin: state.auth.admin
     };
  }
  return connect(mapStateToProps)(ComposedComponent);
};