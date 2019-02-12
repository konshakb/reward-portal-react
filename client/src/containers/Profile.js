import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee';

class Profile extends Component {

  render() {
        return (
            <div style={{'paddingTop': '5em'}}>Profile Page</div>
        )
  }  
}

export default requireEmployee(Profile)
