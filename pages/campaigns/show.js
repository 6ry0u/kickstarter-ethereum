import React, { Component } from 'react'
import { Card, Grid } from 'semantic-ui-react'

import Layout from '../../components/Layout'
import ContributeForm from '../../components/ContributeForm'
import Campaign from '../../ethereum/campaign'

// TODO: Redeploy contract!!
class CampaignShow extends Component {
  static async getInitialProps (props) {
    let summary
    try {
      const campaign = Campaign(props.query.address)
      summary = await campaign.methods.getSummary().call()
    } catch (error) {
      summary = {
        '0': '100',
        '1': '0',
        '2': '0',
        '3': '0',
        '4': 'funder'
      }
    }
    return {
      address: props.query.address,
      minimumContribution: summary['0'],
      balance: summary[1],
      requestCount: summary[2],
      backersCount: summary[3],
      funder: summary[4]
    }
    // return {
    //   '0': '100',
    //   '1': '0',
    //   '2': '0',
    //   '3': '0',
    //   '4': 'funder'
    // }
  }

  renderCards () {
    const {
      minimumContribution,
      balance,
      requestCount,
      backersCount,
      funder
    } = this.props
    const items = [
      {
        header: '0xwererewr564we4r56we4r56w456er46w4er6',
        meta: 'Address of funder',
        description:
          'Created this campaign and can create payment requests.',
        style: { overflowWrap: 'break-word'}
      },
      {
        header: balance,
        meta: 'Balance (wei)',
        description: 'Funds available  = (received - spent by requests)'
      },
      {
        header: requestCount,
        meta: 'Requests',
        description:
        `Payment requests created by the funder.
        Requests tries to spend money received by the campaign.
        A majority of backers must approve this request before it can be performed.`
      },
      {
        header: minimumContribution,
        meta: 'minimum contribution (wei)',
        description: 'Minimum amount to contribute to become a backer'
      },
      {
        header: backersCount,
        meta: 'Backers',
        description: 'Number of people that backed this campaign'
      },
  ]

    return <Card.Group items={items} />
  }
  render () {
    return (
      <Layout>
        <h2>Show Campaign</h2>
        <Grid>
          <Grid.Column width={10}>
            {this.renderCards()}
          </Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}

export default CampaignShow
