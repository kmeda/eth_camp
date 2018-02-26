import React, { Component } from 'react';
import { Form, Input, Button, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import {Link, Router} from '../../routes';

import web3 from '../../ethereum/web3';
import factory from '../../ethereum/factory'; 

class CampaignNew extends Component {
  
 state = {minimumContribution: '', errorMessage: '', loading: false}

 onSubmit = async (e) => {
  e.preventDefault();
  this.setState({loading: true, errorMessage: ''});
  try {
    const accounts = await web3.eth.getAccounts();
    await factory.methods
      .createCampaign(this.state.minimumContribution)
      .send({
        from: accounts[0]
      });
    this.setState({loading: false});
    Router.pushRoute('/');
    
  } catch (error) {
    
    this.setState({errorMessage: error.message.split("\n")[0]});
    this.setState({loading: false});
  }

 }
  
  render() {
    
    return (
      <Layout>
        <h3>Create a Campaign</h3>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} >
        <Form.Field>
          <label>Minimum Contribution</label>
          <Input
            label='wei' 
            placeholder='Wei' 
            labelPosition="right"
            value={this.state.minimumContribution}
            onChange={e => this.setState({minimumContribution: e.target.value})}
             />

        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} disabled={this.state.loading} primary>Create!</Button>
        </Form>

      </Layout>
    )
  }
}

export default CampaignNew;