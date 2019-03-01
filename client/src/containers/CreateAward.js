import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'

const awardTypeOptions = [
    {
      value: "1",
      text: "Employee of the Day",
      key: "1"
    },
    {
      value: "2",
      text: "Employee of the Week",
      key: "2"
    },
    {
      value: "3",
      text: "Employee of the Century",
      key: "3"
    }
  ];

class CreateAward extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            employees: [],
        };
    }

    
    
    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
        this.props.getRecipients()
          .then(response => {
            console.log("response says", response);
            this.setState({ employees: response.data });
          })
          .catch(error => console.log(error.response));
      }

    onSubmit = (formProps) => {
        formProps.senderID = this.state.user_id;
        console.log("form props:", formProps);
        this.props.createAward(formProps, () => {
            console.log(formProps);
            // TODO: Determine page to redirect to after award created
          this.props.history.push('/');
        });
      };


    render() {
        const { handleSubmit } = this.props; 
        console.log("senderID is ", this.state.user_id)
        console.log(this.state.employees)
        let employees = this.state.employees;
        let userOptions = employees.map((employee) =>
                <option key={employee.user_id}>{employee.name}</option>
            );
        return (
            <div className='createaward'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.createaward {
                        height: 100%;
                        }
                        .createaward {
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
                                <Field name="awardType" component={semanticFormField} as={Form.Dropdown} options={awardTypeOptions} type="text" placeholder="Choose Type of Award" />
                                <Field name="recipientID" component={semanticFormField} as={Form.Dropdown} options={userOptions} type="text" placeholder="Choose Award Recipient" />
                                {/* <Field name="firstName" component={semanticFormField} as={Form.Input} icon='user' iconPosition='left' type="text" placeholder="First Name" />
                                <Field name="lastName" component={semanticFormField} as={Form.Input} icon='user' iconPosition='left' type="text" placeholder="Last Name" /> */}
                                <Field name="email" component={semanticFormField} as={Form.Input} icon='mail' iconPosition='left' type="text" placeholder="Email" />
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
// function mapStateToProps(state) {
//     return { errorMessage: state.auth.errorMessage };
//   }
function mapStateToProps(state) {
    return { 
        user_id: state.auth.user_id
     };
}
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'createaward'}), requireEmployee)(CreateAward);