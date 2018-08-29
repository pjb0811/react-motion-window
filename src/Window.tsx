import * as React from 'react';
import { TransitionMotion, spring } from 'react-motion';
import styles from './window.css';

type Props = {
  width: number;
  height: number;
  position: string;
  direction: string;
};

class Window extends React.Component<Props> {
  state = {
    width: 0,
    height: 0,
    direction: 'center',
    position: '',
    cell: {
      top: 0,
      left: 0
    },
    cells: []
  };

  wrapper: any = {};

  getPosition = () => {
    const { width, height, position, direction } = this.props;
    const { innerHeight, innerWidth } = window;
    const { offsetLeft, offsetTop } = this.wrapper;

    const top =
      direction === 'top'
        ? innerHeight - offsetTop
        : direction === 'bottom'
          ? -offsetTop - height
          : 0;

    const left =
      direction === 'left'
        ? position.includes('left')
          ? innerWidth
          : position.includes('right')
            ? width
            : offsetLeft + width
        : direction === 'right'
          ? position.includes('left')
            ? -width
            : -offsetLeft - width
          : 0;

    return {
      top,
      left
    };
  };

  componentDidMount() {
    const { width, height, position, direction } = this.props;
    const { top, left } = this.getPosition();

    this.setState({
      width,
      height,
      position,
      direction,
      cell: {
        top,
        left
      }
    });
  }

  addWindow = () => {
    this.setState({
      cells: [
        {
          top: 0,
          left: 0
        }
      ]
    });
  };

  removeWindow = () => {
    this.setState({
      cells: []
    });
  };

  willEnter = () => {
    return { ...this.state.cell };
  };

  willLeave = () => {
    const { cell } = this.state;

    return {
      top: spring(cell.top),
      left: spring(cell.left)
    };
  };

  render() {
    const { width, height, position, children } = this.props;

    return (
      <TransitionMotion
        willEnter={this.willEnter}
        willLeave={this.willLeave}
        styles={this.state.cells.map(
          (cell: { top: number; left: number }, i) => {
            const { top, left } = cell;
            return {
              key: `${i}`,
              style: {
                top: spring(top),
                left: spring(left)
              }
            };
          }
        )}
      >
        {cells => (
          <div
            ref={wrapper => (this.wrapper = wrapper)}
            className={`${styles.windowWrapper} ${position}`}
            style={{
              width,
              height
            }}
          >
            {cells.map(cell => {
              return (
                <div
                  className={styles.window}
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
