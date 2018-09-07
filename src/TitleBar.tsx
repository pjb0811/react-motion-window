import * as React from 'react';
import styles from './window.css';

type Props = {
  titlebar: {
    use: boolean;
    title: string;
    component: React.ComponentType<any> | null;
    height: number;
  };
  width: number;
  toggleWindowSize: () => void;
  handleMouseDown: (e: React.MouseEvent<any>) => void;
  removeWindow: () => void;
};

class TitleBar extends React.Component<Props> {
  render() {
    const {
      titlebar,
      width,
      toggleWindowSize,
      handleMouseDown,
      removeWindow
    } = this.props;

    if (!titlebar.use) {
      return null;
    }

    if (titlebar.component) {
      return (
        <titlebar.component
          width={width}
          height={titlebar.height}
          toggleWindowSize={toggleWindowSize}
          handleMouseDown={handleMouseDown}
          removeWindow={removeWindow}
        />
      );
    }

    return (
      <div
        className={styles.titlebar}
        style={{
          width,
          height: titlebar.height
        }}
      >
        <h4 onDoubleClick={toggleWindowSize} onMouseDown={handleMouseDown}>
          {titlebar.title}
        </h4>
        <button className={styles.resize} onClick={toggleWindowSize} />
        <button className={styles.close} onClick={removeWindow} />
      </div>
    );
  }
}

export default TitleBar;
