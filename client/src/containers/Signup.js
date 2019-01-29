import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import semanticFormField from '../components/SemanticForm';

class Signup extends Component {

  onSubmit = (formProps) => {
    console.log(formProps);
  };
   
  render() {

    const { handleSubmit } = this.props; // handleSubmit provided by redux form

    return (
    <div className='login-form'>
      {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            Register
          </Header>
         
          <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
            <Segment stacked>
              {/* TODO: Refactor to use props */}
              <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
              <Field name="password" component={semanticFormField} as={Form.Input} icon='lock' iconPosition='left' type="text" placeholder="Password" />
              <Field name="confirm-password" component={semanticFormField} as={Form.Input} icon='lock' iconPosition='left' type="text" placeholder="Confirm Password" />
  
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


// export default reduxForm({ form: 'signup'}, LoginForm);
export default reduxForm({ form: 'signup'})(Signup);