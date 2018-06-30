import React from 'react'
import { Menu, Visibility, Button, Container, Tab } from 'semantic-ui-react'
import jump from 'jump.js'

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  marginBottom: '1em',
  marginTop: '2em',
  transition: 'box-shadow 0.5s ease, padding 0.5s ease',
}

const fixedMenuStyle = {
  border: 'none',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
}


export class StickyTopMenu extends React.Component {

  constructor() {
    super()
    this.state = {
      menuFixed: false
    }
    let tabs = [
      "查询",
      "tab2",
      "tab3",
      "tab4",
      "tab5",
    ]
    this.tabs = tabs
    if (tabs.length > 0) this.state = Object.assign(this.state, { activeItem: tabs[0] })
  }

  stickTopMenu = () => {
    this.setState({ menuFixed: true })
  }
  unstickTopMenu = () => {
    this.setState({ menuFixed: false })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    jump("#" + name, { duration: 376, offset: -35 })
  }

  render() {
    const { activeItem, menuFixed } = this.state
    const tabs = this.tabs
    return (
      <Visibility
        onTopPassed={this.stickTopMenu}
        onBottomVisible={this.unstickTopMenu}
        once={false}
      >
        <Menu
          borderless
          fluid
          widths={tabs.length}
          inverted={true}
          color="teal"
          fixed={menuFixed ? 'top' : null}
          style={menuFixed ? fixedMenuStyle : menuStyle}
        >
          <Container>
            {tabs.map((tab) =>
              <Menu.Item
                key={tab}
                name={tab}
                active={activeItem == tab}
                onClick={this.handleItemClick}
              />)}
          </Container>
        </Menu>
      </Visibility>
    )
  }
}