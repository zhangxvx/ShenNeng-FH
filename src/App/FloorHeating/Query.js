import React from 'react'
import { Container, Form, TextArea, Card, Icon, Input, Button, Table, Divider } from 'semantic-ui-react'
import { gettableHeaderColor } from './CssConfig'
// import * as analysisData from '../FloorHeatingData/analysis_100.json'

const headerColor = gettableHeaderColor()

const TableExampleStructured = (props) => (
  <div>
    <Table textAlign='center'  >
      <Table.Header >
        <Table.Row >
          <Table.HeaderCell style={{ backgroundColor: headerColor }} >ID</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>地暖用户</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>行政区域</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>性别</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>出生年份</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>出生地</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>地址</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row >
          <Table.Cell width='2'>{props.value.CID}</Table.Cell>
          <Table.Cell width='2'>{(props.value.result02 == null) ? '' : (props.value.result02 ? "是" : "否")}</Table.Cell>
          <Table.Cell width='2'>{props.value.Area}</Table.Cell>
          <Table.Cell width='2'>{(props.value.Gender == null) ? '' : (props.value.Gender ? "男" : "女")}</Table.Cell>
          <Table.Cell width='2'>{props.value.Birthday}</Table.Cell>
          <Table.Cell width='2'>{props.value.Region}</Table.Cell>
          <Table.Cell width='4'>{props.value.Address}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    <Table textAlign='center' style={{ textColor: 'black' }} >
      <Table.Header >
        <Table.Row >
          <Table.HeaderCell style={{ backgroundColor: headerColor }} colSpan='6' >用气量</Table.HeaderCell>
        </Table.Row>
        <Table.Row >
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>一月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>二月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>三月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>四月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>五月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>六月</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row >
          <Table.Cell >{props.value.Jan}</Table.Cell>
          <Table.Cell >{props.value.Feb}</Table.Cell>
          <Table.Cell >{props.value.March}</Table.Cell>
          <Table.Cell >{props.value.April}</Table.Cell>
          <Table.Cell >{props.value.May}</Table.Cell>
          <Table.Cell >{props.value.June}</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Header>
        <Table.Row >
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>七月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>八月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>九月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>十月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>十一月</Table.HeaderCell>
          <Table.HeaderCell style={{ backgroundColor: headerColor }}>十二月</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row >
          <Table.Cell >{props.value.July}</Table.Cell>
          <Table.Cell >{props.value.August}</Table.Cell>
          <Table.Cell >{props.value.Sept}</Table.Cell>
          <Table.Cell >{props.value.Oct}</Table.Cell>
          <Table.Cell >{props.value.Nov}</Table.Cell>
          <Table.Cell >{props.value.Dec}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

export class Query extends React.Component {
  constructor() {
    super()

    this.handleClick.bind(this)
    this.handleSearchChange.bind(this)
    this.state = {
      queryid: '',
      result: {}
    }
  }

  componentWillMount = () => {
    fetch("http://192.168.50.58/data/zx/地暖/analysis_100.json")
      .then(res => res.json())
      .then((json) => {
        this.setState({
          analysisData: json,
          queryid: json[0].CID,
          result: json[0]
        })
      })
      .catch(error => this.setState({ error: "fetch error" }))
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleSearchChange = (event) => {
    var value = event.target.value.replace(/(^\s+)|(\s+$)/g, "")
    this.setState({
      queryid: value,
    })
  }

  handleClick = () => {
    let analysisData = this.state.analysisData
    // console.log(analysisData)

    if (this.state.queryid == null) {
      alert("输入不能为空！")
    }
    else {
      let queryflag = 0
      for (let i in analysisData) {
        if (analysisData[i].CID == this.state.queryid) {
          queryflag = 1
          this.setState({ result: analysisData[i] })
        }
      }
      if (queryflag == 0) {
        alert("该用户不存在！请检查输入ID是否正确！")
      }
    }
  }
  render() {
    return (
      <Card fluid >
        <Card.Content>
          <Card.Header>地暖用户查询</Card.Header>
        </Card.Content>
        <Card.Content style={{ height: 500 }}>
          <Input fluid type='text' placeholder='请输入用户ID' value={this.state.queryid} onChange={this.handleSearchChange} action>
            <input style={{ borderColor: '#DCDCDC' }} pattern='[0-9]' />
            <Button style={{ backgroundColor: '#F5F5F5' }} onClick={this.handleClick} icon={<Icon name='search' circular link />}></Button>
          </Input>
          <Divider hidden />
          <TableExampleStructured value={this.state.result} />
        </Card.Content>
      </Card>
    )
  }
}
