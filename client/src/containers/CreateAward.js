import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Input } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'

class CreateAward extends Component {
    onSubmit = (formProps) => {
        console.log(formProps);
        this.props.createAward(formProps, () => {
            // TODO: Determine page to redirect to after award created
          this.props.history.push('/');
        });
      };

    handleChange(event) {
        const {name, value} = event.target
        this.setState({ [name]: value })
    }
    
    render() {
        const { handleSubmit } = this.props; 
        return (
            <div className='create-award'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.create-award {
                        height: 100%;
                        }
                        .create-award {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Create an Award
                        </Header>
                        <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                            <Segment stacked>
                                <Field name="firstName" component={semanticFormField} as={Form.Input} icon='user' iconPosition='left' type="text" placeholder="First Name" />
                                <Field name="lastName" component={semanticFormField} as={Form.Input} icon='user' iconPosition='left' type="text" placeholder="Last Name" />
                                <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
                                <Field name="awardType" component={semanticFormField} as={Form.Input} iconPosition='left' control='select'>
                                    <option value="1">Employee of the Day</option>
                                    <option value="2">Employee of the Week</option>
                                    <option value="3">Employee of the Month</option>
                                    <option value="4">Employee of the Universe</option></Field>
                                <Field name="date" component={semanticFormField} as={Form.Input} icon='calendar' iconPosition='left' type="date"/>
                                <Field name="time" component={semanticFormField} as={Form.Input} icon='clock' iconPosition='left' type="time" />
                                <div>{this.props.errorMessage}</div>
                                <Button color='teal' fluid size='large'>
                                    Submit
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
    return { errorMessage: state.auth.errorMessage };
  }

//export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'create-award'}), requireEmployee)(CreateAward);
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'create-award'}))(CreateAward);
