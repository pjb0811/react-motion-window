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
          direction="bottom"
          titlebar={{
            use: true,
            title: 'test',
            height: 30
            // component: props => {
            //   console.log(props);
            //   return <div onDoubleClick={props.toggleWindowSize}>test</div>;
            // }
          }}
          resize={true}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'white',
              border: '1px solid',
              boxSizing: 'border-box'
            }}
          >
            test
          </div>
        </Window>
      </div>
    );
  }
}
