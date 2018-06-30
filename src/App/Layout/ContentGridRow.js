import React from 'react'
import { Grid, GridRow, GridColumn, Segment, Card } from 'semantic-ui-react';

const getLeftContent = () => (
  <Card fluid >
    <Card.Content>
      <Card.Header>LEFT</Card.Header>
    </Card.Content>
    <Card.Content><div style={{ height: 700 }}>
      This is the left part
      </div>
    </Card.Content>
  </Card>
)

const getRightContent = () => (
  <Card fluid >
    <Card.Content>
      <Card.Header>RIGHT</Card.Header>
    </Card.Content>
    <Card.Content>
      <div style={{ height: 700 }}>
        This is the right part
      </div>
    </Card.Content>
  </Card>
)

export class ContentGridRow extends React.Component {

  constructor() {
    super()
  }

  render() {

    let { leftContent, rightContent, ...others } = this.props
    if (!leftContent) leftContent = getLeftContent()
    if (!rightContent) rightContent = getRightContent()

    return (
      <Grid stackable {...others}>
        <GridColumn width={11}>
          <div>{leftContent}</div>
        </GridColumn>
        <GridColumn width={5}>
          <div>{rightContent}</div>
        </GridColumn>

      </Grid>
    )
  }

}