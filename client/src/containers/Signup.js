import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';

class Signup extends Component {
  onSubmit = (formProps) => {
    console.log(formProps);
    this.props.signup(formProps, () => {
      this.props.history.push('/feature');
    });
  };
   
  render() {

    const { handleSubmit } = this.props; // handleSubmit provided by redux form

    return (
    <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
        .login-form {
          padding-top: 5em
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Register
          </Header>
          <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
            <Segment stacked>
              <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
              <Field name="password" component={semanticFormField} as={Form.Input} icon='lock' iconPosition='left' type="password" placeholder="Password" />
              <Field name="confirm-password" component={semanticFormField} as={Form.Input} icon='lock' iconPosition='left' type="password" placeholder="Confirm Password" />
              <div>{this.props.errorMessage}</div>
              <Button color='teal' fluid size='large'>
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  )}  
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose (
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup'})
)(Signup);

