import React from 'react'
import { Container} from 'semantic-ui-react'
import { ContentGridRowN } from './App/Layout/ContentGridRowN'

import { PipeReactMap } from './App/Pipeline/PipeReactMap'
import { PipeChart } from './App/Pipeline/PipeChart'
import { PipeChart2 } from './App/Pipeline/PipeChart2'
import { PipeChart3 } from './App/Pipeline/PipeChart3'

export class AppPipe extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  handleTabRef = tabRef => this.setState({ tabRef })

  render() {

    const counter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    const { tabRef } = this.refs
    return (
      <div>
        {/* <StickyTopMenu/> */}
        <Container >
          <ContentGridRowN id="tab1" leftContent={<PipeReactMap />}/>
          <ContentGridRowN id="tab3" leftContent={<PipeChart />}/>
          <ContentGridRowN id="tab4" leftContent={<PipeChart2 />}/>
          <ContentGridRowN id="tab5" leftContent={<PipeChart3 />}/>
        </Container>
        {/* <Footer/> */}
      </div >
    )
  }
}