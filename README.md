# react-motion-window

> window app using react &amp; react-motion

[![NPM](https://img.shields.io/npm/v/react-motion-window.svg)](https://www.npmjs.com/package/react-motion-window) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-motion-window
```

## Usage

[demo](https://codesandbox.io/s/4r0327jmrw)

```tsx
import * as React from 'react';

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
          test
        </Window>
      </div>
    );
  }
}
```

## License

MIT © [pjb0811](https://github.com/pjb0811)
