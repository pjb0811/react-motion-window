import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import css from './window.css';

type Props = {
  width: number;
  height: number;
  position: string;
  direction: string;
  children: React.ReactChild;
};

const POSITIONS = {
  top: {
    top: 0,
    left: 0,
    right: 0,
    margin: '0 auto'
  },
  left: {
    left: 0
  },
  right: {
    right: 0
  },
  center: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  },
  bottom: {
    left: 0,
    right: 0,
    bottom: 0,
    margin: '0 auto'
  }
  // 'bottom-right': {
  //   bottom: 0,
  //   right: 0
  // }
};

class Window extends React.Component<Props> {
  state = {
    cells: [],
    directions: {
      top: 'auto',
      left: 'auto',
      right: 'auto',
      bottom: 'auto'
    }
  };

  componentDidMount() {
    const { width, height, position, direction } = this.props;
    const { directions } = this.state;

    this.setState({
      width,
      height,
      position,
      direction,
      directions: {
        top: direction === 'top' ? window.innerHeight : directions.top,
        left: direction === 'left' ? -width : directions.left,
        right: direction === 'right' ? -width : directions.right,
        bottom: direction === 'bottom' ? -height : directions.bottom
      }
    });
  }

  addWindow = () => {
    this.setState({
      cells: [{ top: 0 }]
    });
  };

  removeWindow = () => {
    this.setState({
      cells: []
    });
  };

  willEnter = (_: any) => {
    console.log(this.state.directions);
    return { top: 200 };
  };

  willLeave = (_: any) => {
    const { height } = this.props;
    return { top: spring(height) };
  };

  render() {
    const { width, height, position, children } = this.props;
    const { cells } = this.state;
    const styles = cells.map((cell: { top: number }, i) => {
      const { top } = cell;
      return {
        key: `${i}`,
        style: { top: spring(top) }
      };
    });

    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={styles}
      >
        {styles => (
          <div
            className={css.windowWrapper}
            style={{
              ...POSITIONS[position],
              width,
              height
            }}
          >
            {styles.map(cell => {
              return (
                <div
                  className={css.window}
                  key={cell.key}
                  style={{
                    ...cell.style,
                    width,
                    height
                  }}
                >
                  {children}
                </div>
              );
            })}
          </div>
        )}
      </TransitionMotion>
    );
  }
}

export default Window;
