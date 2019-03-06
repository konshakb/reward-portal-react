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

    onSubmit = (formProps) => {
        // formProps.senderID = this.state.user_id;
        // console.log("form props:", formProps);
        // this.props.createAward(formProps, () => {
        //     console.log(formProps);
        //     // TODO: Determine page to redirect to after award created
        //   this.props.history.push('/');
        // });
      };

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
                    <Table collapsing compact celled definition>
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