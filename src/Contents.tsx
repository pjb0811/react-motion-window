import * as React from 'react';

type Props = {
  width: number;
  height: number;
  children: React.ReactNode;
};

class Contents extends React.Component<Props> {
  render() {
    const { width, height, children } = this.props;
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
}

export default Contents;
