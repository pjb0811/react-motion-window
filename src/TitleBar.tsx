import React, { Component } from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';

class TitleBar extends Component {
  render() {
    const {
      transparent,
      titlebar,
      width,
      toggleWindowSize,
      handleMouseDown,
      removeWindow
    } = this.props;

    if (transparent || !titlebar.use) {
      return null;
    }

    return (
      <Segment
        attached="top"
        style={{
          width,
          boxSizing: 'border-box'
        }}
        clearing
        onDoubleClick={toggleWindowSize}
        onMouseDown={handleMouseDown}
      >
        <Header
          as="h4"
          floated="left"
          style={{
            margin: 0
          }}
        >
          {titlebar.title}
        </Header>
        <Header as="h6" floated="right">
          <Icon link name="square" color="green" onClick={toggleWindowSize} />
          <Icon link name="close" color="red" onClick={removeWindow} />
        </Header>
      </Segment>
    );
  }
}

export default TitleBar;
