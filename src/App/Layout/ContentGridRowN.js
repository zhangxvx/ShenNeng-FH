import React from 'react'
import { Grid, GridRow, GridColumn, Segment, Card } from 'semantic-ui-react';

const getLeftContent = () => (
  <Card fluid >
    <Card.Content>
      <Card.Header>LEFT</Card.Header>
    </Card.Content>
    <Card.Content>
    <div style={{ height: 700 }}>
        This is the left part
      </div>
    </Card.Content>
  </Card>
)

export class ContentGridRowN extends React.Component {

  constructor() {
    super()
  }

  render() {

    let { leftContent, ...others } = this.props
    if (!leftContent) leftContent = getLeftContent()

    return (
      <Grid stackable {...others}>
        <GridColumn width={16}>
        <div>{leftContent}</div>
      </GridColumn>
      
      </Grid>
    )
  }

}