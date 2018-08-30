import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class Contents extends Component {
  render() {
    const { transparent, width, height, children } = this.props;
    if (transparent) {
      return (
        <div
          style={{
            width,
            height
          }}
        >
          {children}
        </div>
      );
    }

    return (
      <Segment
        attached
        style={{
          width,
          height,
          boxSizing: 'border-box'
        }}
      >
        {children}
      </Segment>
    );
  }
}

export default Contents;
