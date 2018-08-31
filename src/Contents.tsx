import * as React from 'react';
import { Segment } from 'semantic-ui-react';

type Props = {
  transparent: boolean;
  width: number;
  height: number;
  children: React.ReactNode;
};

class Contents extends React.Component<Props> {
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
