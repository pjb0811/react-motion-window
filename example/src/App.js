import React, { Component } from 'react';

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
          width={200}
          height={200}
          position="center"
          direction="top"
          titlebar={{
            use: true,
            title: 'test'
          }}
        >
          <div
            style={{
              background: 'white',
              border: '1px solid'
            }}
          >
            test
          </div>
        </Window>
      </div>
    );
  }
}
