import React, { Component } from 'react';
import { Header, Segment, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Window from 'react-motion-window';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <button
            onClick={() => {
              this.window.addWindow();
            }}
          >
            add window
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.window.removeWindow();
            }}
          >
            remove window
          </button>
        </div>
        <Window
          ref={window => (this.window = window)}
          width={300}
          height={300}
          position="right"
          direction="left"
          titlebar={{
            use: true,
            height: 50,
            component: props => {
              const {
                width,
                height,
                toggleWindowSize,
                handleMouseDown,
                removeWindow,
                isFulling
              } = props;

              return (
                <Segment
                  clearing
                  attached="top"
                  style={{
                    width,
                    height,
                    boxSizing: 'border-box'
                  }}
                  onDoubleClick={toggleWindowSize}
                  onMouseDown={handleMouseDown}
                >
                  <Header as="h4" floated="left">
                    Test
                  </Header>
                  <Header as="h4" floated="right">
                    <Icon
                      link
                      color={`${isFulling ? 'green' : 'yellow'}`}
                      name={`toggle ${isFulling ? 'on' : 'off'}`}
                      onClick={toggleWindowSize}
                    />
                    <Icon
                      link
                      name="close"
                      color="red"
                      onClick={removeWindow}
                    />
                  </Header>
                </Segment>
              );
            }
          }}
          resize={true}
        >
          <Segment
            attached
            style={{
              width: '100%',
              height: '100%',
              boxSizing: 'border-box'
            }}
          >
            test
          </Segment>
        </Window>
      </div>
    );
  }
}
