import React, {Component} from "react"
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form, Grid, Header, Segment, Table, Checkbox } from 'semantic-ui-react';
import * as actions from '../actions';
import semanticFormField from '../components/SemanticForm';
import requireEmployee from './requireEmployee'
import update from 'immutability-helper';


class ViewAwards extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            awards: [],
            selections: {}
        };
    }


    onSubmit = (formProps) => {
        //formProps.senderID = this.state.user_id;
        let selections = this.state.selections;
        let deleteIDs = Object.keys(selections)
        formProps = deleteIDs
        this.props.deleteAwards(formProps, () => {
            // TODO: Determine page to redirect to after award deleted
          this.props.history.push('/');
        });
      };


      
    componentDidMount() {
        this.setState({
            user_id: this.props.user_id
        })
        console.log("this userid", this.props.user_id)
        this.props.getAwards(this.props.user_id)
          .then(response => {
            console.log("response says", response);
            let givenAwards = response.data
            this.setState({ awards: givenAwards });
          })
          .catch(error => console.log(error.response));
      }

    //   componentDidUpdate(prevState) {
    //     if (this.state.awards.length != prevState.awards.length) {
    //         this.setState({
    //             awards: this.state.awards
    //         })
    //     }
    // }  

    handleSelect = (id) => {
        console.log("my select", this.state.selections)
        this.setState((prevState) => {
          if (prevState.selections[id]) {
            // { 1: true } -> {}
            return update(prevState, {
              selections: { $unset: [id] },
            });
          }
          // {} -> { 1: true }
          return update(prevState, {
            selections: { [id]: { $set: true } },
          });
        });
      }

    render() {
        const { handleSubmit } = this.props; 
        return (
            <div className='viewawards'>
                <style>{`body > div,
                        body > div > div,
                        body > div > div > div.viewawards {
                        height: 100%;
                        }
                        .viewawards {
                        padding-top: 5em
                        }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 800 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Given Awards
                    </Header>
                    <Form size='large' onSubmit={handleSubmit(this.onSubmit)}>
                    <Segment stacked>
                    <Table celled>
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell>Name of Recipient</Table.HeaderCell>
                        <Table.HeaderCell>Type of Award</Table.HeaderCell>
                        <Table.HeaderCell>Date Given</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.awards.map(award => (
                        <Table.Row key={award.award_id}>
                        <Table.Cell collapsing>
                        <Checkbox 
                            onChange={() => this.handleSelect(award.award_id)}
                        />
                        </Table.Cell>
                        <Table.Cell>
                        {award.name}
                        </Table.Cell>
                        <Table.Cell>
                        {award.award_name}
                        </Table.Cell>
                        <Table.Cell>
                        {award.date}
                        </Table.Cell>
                    </Table.Row>))}
                    </Table.Body>
                    </Table>
                    <Button color='teal' fluid size='large'>
                        Delete Selected Awards
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
//    }
function mapStateToProps(state) {
    return { 
        user_id: state.auth.user_id
     };
}
export default compose (connect(mapStateToProps, actions), reduxForm({ form: 'viewawards'}), requireEmployee)(ViewAwards);