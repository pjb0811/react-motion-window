import { Motion, TransitionMotion, spring } from 'react-motion';
import './window.css';
import React, { Component, Fragment } from 'react';
import TitleBar from './TitleBar';
import Contents from './Contents';

class Window extends Component {
  state = {
    width: 0,
    height: 0,
    wrapper: {
      isFull: false,
      show: false,
      width: 0,
      height: 0
    },
    cell: {
      top: 0,
      left: 0
    },
    cells: [],
    titlebar: {
      use: false,
      title: '',
      height: 20
    },
    mouseXY: [0, 0],
    mouseDelta: [0, 0],
    isMoved: false,
    isPressed: false
  };

  getPosition = () => {
    const { width, height, position, direction } = this.props;
    const { innerHeight, innerWidth } = window;
    const { offsetLeft, offsetTop } = this.wrapperContext;

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
    const { width, height, titlebar } = this.props;
    // const { top, left } = this.getPosition();

    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState(prevState => {
      return {
        width,
        height,
        wrapper: {
          ...prevState.wrapper,
          width,
          height
        },
        // cell: {
        //   top,
        //   left
        // },
        titlebar: {
          ...prevState.titlebar,
          ...titlebar
        }
      };
    });
  }

  addWindow = () => {
    this.setState(prevState => {
      return {
        wrapper: {
          ...prevState.wrapper,
          show: true
        },
        cell: this.getPosition(),
        cells: [
          {
            top: 0,
            left: 0
          }
        ]
      };
    });
  };

  toggleWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    const { width, height, wrapper, cells } = this.state;

    this.setState({
      wrapper: {
        ...wrapper,
        isFull: !wrapper.isFull,
        width: wrapper.isFull ? width : innerWidth,
        height: wrapper.isFull ? height : innerHeight
      },
      cells: cells.map(cell => {
        return {
          top: 0,
          left: 0
        };
      })
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

  didLeave = () => {
    this.setState(prevState => {
      return {
        wrapper: {
          ...prevState.wrapper,
          show: false
        }
      };
    });
  };

  handleMouseDown = e => {
    const { pageX, pageY } = e;

    this.setState({
      isPressed: true,
      isMoved: false,
      mouseDelta: [pageX, pageY],
      mouseXY: [pageX, pageY]
    });
  };

  handleMouseMove = e => {
    const { pageX, pageY } = e;
    const {
      isPressed,
      mouseXY: [mx, my]
    } = this.state;

    if (isPressed) {
      this.setState({
        mouseXY: [pageX, pageY],
        mouseDelta: [pageX - mx, pageY - my],
        isMoved: true
      });
      this.dragWindow();
    }
  };

  dragWindow = () => {
    const { mouseDelta, cells } = this.state;
    const [dx, dy] = mouseDelta;

    let newCells = cells.concat();

    newCells = newCells.map(cell => {
      return {
        top: cell.top + dy,
        left: cell.left + dx
      };
    });

    this.setState({
      cells: newCells
    });
  };

  handleMouseUp = () => {
    const { isPressed } = this.state;

    if (isPressed) {
      this.setState({
        isPressed: false
      });
    }
  };

  render() {
    const { position, children, transparent } = this.props;
    const { titlebar, wrapper } = this.state;

    return (
      <Motion
        style={{
          width: spring(wrapper.width),
          height: spring(wrapper.height)
        }}
      >
        {({ width, height }) => {
          return (
            <div
              ref={context => (this.wrapperContext = context)}
              className={`window-wrapper ${position}`}
              style={{
                width,
                height,
                visibility: wrapper.show ? 'visible' : 'hidden'
              }}
            >
              <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                didLeave={this.didLeave}
                styles={this.state.cells.map((cell, i) => {
                  const { top, left } = cell;
                  return {
                    key: `${i}`,
                    style: {
                      top: spring(top),
                      left: spring(left)
                    }
                  };
                })}
              >
                {cells => (
                  <Fragment>
                    {cells.map(cell => {
                      return (
                        <div
                          className="window"
                          key={cell.key}
                          style={{
                            ...cell.style,
                            width,
                            height
                          }}
                        >
                          <TitleBar
                            transparent={transparent}
                            titlebar={titlebar}
                            width={width}
                            toggleWindowSize={this.toggleWindowSize}
                            handleMouseDown={this.handleMouseDown}
                            removeWindow={this.removeWindow}
                          />
                          <Contents
                            transparent={transparent}
                            width={width}
                            height={height}
                            children={children}
                          />
                        </div>
                      );
                    })}
                  </Fragment>
                )}
              </TransitionMotion>
            </div>
          );
        }}
      </Motion>
    );
  }
}

export default Window;
