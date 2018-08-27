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
          position="top"
          direction="top"
        />
      </div>
    );
  }
}
