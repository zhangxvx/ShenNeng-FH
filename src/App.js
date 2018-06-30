import React from 'react'
import { Container, Header, Divider } from 'semantic-ui-react'
import { Query } from './App/FloorHeating/Query'
import { List } from './App/FloorHeating/List'
import { Age } from './App/FloorHeating/Age'
import { Area } from './App/FloorHeating/Area'
import { Provinces } from './App/FloorHeating/Provinces'
import { HotMapEcharts } from './App/FloorHeating/HotMapEcharts'

import { TopRightUsageChange } from './App/FloorHeating2/chartTopRightUsageChange'
import { BottomLeftYearUsage } from "./App/FloorHeating2/chartBottomLeftYearUsage"
import { BottomRightUseRange } from "./App/FloorHeating2/chartBottomRightUseRange"
import { BottomMiddleMap1 } from "./App/FloorHeating2/chartBottomMiddleMap1"
import { BottomMiddleMap2 } from "./App/FloorHeating2/chartBottomMiddleMap2"

import { ContentGridRow } from './App/Layout/ContentGridRow'
import { ContentGridRowN } from './App/Layout/ContentGridRowN'
import { ContentGridRowE } from './App/Layout/ContentGridRowE'


export class App extends React.Component {

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
        <Container>
          <ContentGridRow id="查询" leftContent={<Query />} rightContent={<List />} />
          <Divider hidden /><Header as="h2">地暖预测</Header>
          <ContentGridRowE id="tab2" leftContent={<Area />} rightContent={<Provinces />} />
          <ContentGridRowN id="tab3" leftContent={<Age />} />
          <Divider hidden /><Header as="h2">地暖分析</Header>
          <ContentGridRowN id="tab3" leftContent={<TopRightUsageChange />} />
          <ContentGridRowE id="tab4" leftContent={<BottomRightUseRange />} rightContent={<BottomLeftYearUsage />} />
          <ContentGridRowE id="tab5" leftContent={<BottomMiddleMap2 />} rightContent={<BottomMiddleMap1 />} />
          <ContentGridRowN id="tab5" leftContent={<HotMapEcharts />} />
        </Container>
      </div >
    )
  }
}