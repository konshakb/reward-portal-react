import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';

class Signin extends Component {

  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      if (this.props.admin) this.props.history.push('/admin-feature');
      else this.props.history.push('/feature');
    });
  };

  render() {

    console.log('props from signin', this.props);

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
              Sign In
            </Header>
          
            <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
              <Segment stacked>
                <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
                <Field name="password" component={semanticFormField} as={Form.Input} icon='lock' iconPosition='left' type="password" placeholder="Password" />
                <Button color='teal' fluid size='large'>
                  Sign in
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    )
  }  
}

function mapStateToProps(state) {
  return { 
    errorMessage: state.auth.errorMessage,
    admin: state.auth.admin
  };
}

export default compose (
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin'})
)(Signin);

