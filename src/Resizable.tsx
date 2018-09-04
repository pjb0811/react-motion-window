import * as React from 'react';
import styles from './window.css';

type Props = {
  width: number;
  height: number;
  cells: Array<{ top: number; left: number }>;
  resizableMouseDown: (
    params: { e: React.MouseEvent<any>; type: string }
  ) => void;
  resizableMouseMove: (e: any) => void;
  resizableMouseUp: () => void;
};

class Resizable extends React.Component<Props> {
  state = {
    size: 10
  };

  componentDidMount() {
    const { resizableMouseMove, resizableMouseUp } = this.props;
    window.addEventListener('mousemove', resizableMouseMove);
    window.addEventListener('mouseup', resizableMouseUp);
  }

  render() {
    const { width, height, cells, resizableMouseDown } = this.props;
    const [cell = { top: 0, left: 0 }] = cells;
    const { top, left } = cell;
    const { size } = this.state;

    return (
      <ul
        className={styles.resizable}
        style={{
          width: width + size,
          height: height + size,
          top: top + -size / 2,
          left: left + -size / 2
        }}
      >
        <li
          className={styles.nwse}
          style={{
            width: size / 2,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'left-top' });
          }}
        />
        <li
          className={styles.ns}
          style={{
            width,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'top' });
          }}
        />
        <li
          className={styles.nesw}
          style={{
            width: size / 2,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'right-top' });
          }}
        />
        <li
          className={styles.ew}
          style={{
            width: size / 2,
            height
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'left' });
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
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'right' });
          }}
        />
        <li
          className={styles.nesw}
          style={{
            width: size / 2,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'left-bottom' });
          }}
        />
        <li
          className={styles.ns}
          style={{
            width,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'bottom' });
          }}
        />
        <li
          className={styles.nwse}
          style={{
            width: size / 2,
            height: size / 2
          }}
          onMouseDown={e => {
            resizableMouseDown({ e, type: 'right-bottom' });
          }}
        />
      </ul>
    );
  }
}

export default Resizable;
