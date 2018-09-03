import * as React from 'react';
import styles from './window.css';

type Props = {
  width: number;
  height: number;
  resizableMouseDown: (e: React.MouseEvent<any>) => void;
  resizableMouseMove: () => void;
  resizableMouseUp: () => void;
};

class Resizable extends React.Component<Props> {
  state = {
    size: 10
  };

  render() {
    const { width, height } = this.props;
    const { size } = this.state;

    return (
      <ul
        className={styles.resizable}
        style={{
          width: width + size,
          height: height + size,
          top: -size / 2,
          left: -size / 2
        }}
      >
        <li
          className={styles.nwse}
          style={{
            width: size / 2,
            height: size / 2
          }}
        />
        <li
          className={styles.ns}
          style={{
            width,
            height: size / 2
          }}
        />
        <li
          className={styles.nesw}
          style={{
            width: size / 2,
            height: size / 2
          }}
        />
        <li
          className={styles.ew}
          style={{
            width: size / 2,
            height
          }}
        />
        <li
          style={{
            width,
            height
          }}
        />
        <li
          className={styles.ew}
          style={{
            width: size / 2,
            height
          }}
        />
        <li
          className={styles.nesw}
          style={{
            width: size / 2,
            height: size / 2
          }}
        />
        <li
          className={styles.ns}
          style={{
            width,
            height: size / 2
          }}
        />
        <li
          className={styles.nwse}
          style={{
            width: size / 2,
            height: size / 2
          }}
        />
      </ul>
    );
  }
}

export default Resizable;
