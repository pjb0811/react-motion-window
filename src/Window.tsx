import { Motion, TransitionMotion, spring } from 'react-motion';
import * as React from 'react';
import Resizable from './Resizable';
import TitleBar from './TitleBar';
import Contents from './Contents';
import styles from './window.css';

type Props = {
  width: number;
  height: number;
  position: string;
  direction: string;
  transparent: boolean;
  titlebar: {};
};

type State = {
  width: number;
  height: number;
  wrapper: {
    isFull: boolean;
    show: boolean;
    width: number;
    height: number;
    mouseXY: Array<number>;
    mouseDelta: Array<number>;
    isMoved: boolean;
    isPressed: boolean;
  };
  cell: {
    top: number;
    left: number;
  };
  cells: Array<{ top: number; left: number }>;
  titlebar: {
    use: boolean;
    title: string;
    component: React.ComponentType<any> | null;
    height: number;
  };
  resizable: {
    type: string;
    mouseXY: Array<number>;
    mouseDelta: Array<number>;
    isMoved: boolean;
    isPressed: boolean;
    shiftXY: Array<number>;
    position: { top: number; left: number };
  };
};

class Window extends React.Component<Props, State> {
  state = {
    width: 0,
    height: 0,
    wrapper: {
      isFull: false,
      show: false,
      width: 0,
      height: 0,
      isMoved: false,
      isPressed: false,
      mouseXY: [0, 0],
      mouseDelta: [0, 0]
    },
    cell: {
      top: 0,
      left: 0
    },
    cells: [],
    titlebar: {
      use: false,
      title: '',
      component: null,
      height: 30
    },
    resizable: {
      type: 'top',
      isMoved: false,
      isPressed: false,
      mouseXY: [0, 0],
      mouseDelta: [0, 0],
      shiftXY: [0, 0],
      position: { top: 0, left: 0 }
    }
  };

  wrapperContext: HTMLDivElement | any;

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
      cells: cells.map(_ => {
        return {
          top: 0,
          left: 0
        };
      })
    });
  };

  removeWindow = () => {
    const { width, height, wrapper } = this.state;

    this.setState({
      wrapper: {
        ...wrapper,
        isFull: false,
        width,
        height
      },
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

  handleMouseDown = (e: React.MouseEvent<any>) => {
    const { pageX, pageY } = e;
    const { wrapper } = this.state;

    this.setState({
      wrapper: {
        ...wrapper,
        isPressed: true,
        isMoved: false,
        mouseDelta: [pageX, pageY],
        mouseXY: [pageX, pageY]
      }
    });

    e.preventDefault();
  };

  handleMouseMove = (e: any) => {
    const { pageX, pageY } = e;
    const { wrapper } = this.state;
    const {
      isPressed,
      mouseXY: [mx, my]
    } = wrapper;

    if (isPressed) {
      this.setState({
        wrapper: {
          ...wrapper,
          mouseXY: [pageX, pageY],
          mouseDelta: [pageX - mx, pageY - my],
          isMoved: true
        }
      });
      this.dragWindow();
    }
  };

  dragWindow = () => {
    const { wrapper, cells } = this.state;
    const [dx, dy] = wrapper.mouseDelta;

    let newCells: Array<{ top: number; left: number }> = cells.concat();

    newCells = newCells.map((cell: { top: number; left: number }) => {
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
    const { wrapper } = this.state;
    const { isPressed } = wrapper;

    if (isPressed) {
      this.setState({
        wrapper: {
          ...wrapper,
          isPressed: false
        }
      });
    }
  };

  resizableMouseDown = (params: { e: any; type: string }) => {
    const { e, type } = params;
    const { resizable } = this.state;
    const { pageX, pageY, target } = e;

    this.setState({
      resizable: {
        ...resizable,
        type,
        isPressed: true,
        isMoved: false,
        shiftXY: [
          target.getBoundingClientRect().left - resizable.position.left,
          target.getBoundingClientRect().top - resizable.position.top
        ],
        mouseDelta: [
          pageX - target.getBoundingClientRect().left,
          pageY - target.getBoundingClientRect().top
        ],
        mouseXY: [pageX, pageY]
      }
    });

    e.preventDefault();
  };

  resizableMouseMove = (e: any) => {
    const { pageX, pageY } = e;
    const { resizable } = this.state;
    const {
      isPressed
      // mouseXY: [mx, my]
    } = resizable;

    if (isPressed) {
      this.setState({
        resizable: {
          ...resizable,
          mouseXY: [pageX, pageY],
          // mouseDelta: [pageX - mx, pageY - my],
          isMoved: true
        }
      });

      this.resizableWindow();
    }
  };

  resizableWindow = () => {
    const { resizable } = this.state;
    const { shiftXY, mouseXY, mouseDelta, type } = resizable;
    const [mx, my] = mouseXY;
    const [sx, sy] = shiftXY;
    const [dx, dy] = mouseDelta;

    let resizeTop = my - sy - dy;
    let resizeLeft = mx - sx - dx;

    switch (type) {
      case 'top':
        // resizeTop = resizeTop = my - sy > 0 ? 0 : my - sy;
        // resizeLeft = 0;
        break;
      case 'rightTop':
        break;

      case 'left':
        // resizeTop = 0;
        // resizeLeft = mx - sx > 0 ? 0 : mx - sx;
        break;

      case 'right':
        break;

      case 'leftBottom':
        break;

      case 'bottom':
        break;

      case 'rightBottom':
        break;

      default:
        break;
    }

    this.setState({
      resizable: {
        ...resizable,
        position: {
          top: resizeTop,
          left: resizeLeft
        }
      }
    });
    /*

    switch (type) {
      case 'top':
        resizeWidth = width;
        resizeHeight = height - dy;
        break;
      case 'rightTop':
        resizeWidth = width + dx;
        resizeHeight = height - dy;
        break;

      case 'left':
        resizeWidth = width - dx;
        resizeHeight = height;
        break;

      case 'right':
        resizeWidth = width + dx;
        resizeHeight = height;
        break;

      case 'leftBottom':
        resizeWidth = width - dx;
        resizeHeight = height + dy;
        break;

      case 'bottom':
        resizeWidth = width;
        resizeHeight = height + dy;
        break;

      case 'rightBottom':
        resizeWidth = width + dx;
        resizeHeight = height + dy;
        break;

      default:
        resizeWidth = width - dx;
        resizeHeight = height - dy;
        break;
    }

    newCells = newCells.map(_ => {
      return {
        top: resizeTop,
        left: resizeLeft
      };
    });

    this.setState({
      wrapper: {
        ...wrapper,
        width: resizeWidth,
        height: resizeHeight
      },
      cells: newCells
    }); */
  };

  resizableMouseUp = () => {
    const { resizable } = this.state;
    const { isPressed } = resizable;

    if (isPressed) {
      this.setState({
        resizable: {
          ...resizable,
          isPressed: false
        }
      });
    }
  };

  render() {
    const { position, children, transparent } = this.props;
    const { titlebar, wrapper, resizable } = this.state;

    return (
      <Motion
        style={{
          translateX: spring(resizable.position.left),
          translateY: spring(resizable.position.top),
          width: spring(wrapper.width),
          height: spring(wrapper.height)
        }}
      >
        {({ width, height }) => {
          return (
            <div
              ref={context => (this.wrapperContext = context)}
              className={`${styles.windowWrapper} ${styles[position]}`}
              style={{
                width,
                height,
                visibility: wrapper.show ? 'visible' : 'hidden'
              }}
            >
              <Resizable
                width={wrapper.width}
                height={wrapper.height}
                cells={this.state.cells}
                resizable={resizable}
                resizableMouseDown={this.resizableMouseDown}
                resizableMouseMove={this.resizableMouseMove}
                resizableMouseUp={this.resizableMouseUp}
              />
              <TransitionMotion
                willEnter={this.willEnter}
                willLeave={this.willLeave}
                didLeave={this.didLeave}
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
                  <React.Fragment>
                    {cells.map(cell => {
                      return (
                        <div
                          className={styles.window}
                          key={cell.key}
                          style={{
                            ...cell.style,
                            // transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
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
                            titlebar={titlebar}
                            width={width}
                            height={height}
                            children={children}
                          />
                        </div>
                      );
                    })}
                  </React.Fragment>
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
