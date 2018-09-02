import * as React from 'react';
import styles from './window.css';

type Props = {
  transparent: boolean;
  titlebar: {
    use: boolean;
    title: string;
    component: React.ComponentType<any> | null;
  };
  width: number;
  toggleWindowSize: () => void;
  handleMouseDown: (e: React.MouseEvent<any>) => void;
  removeWindow: () => void;
};

class TitleBar extends React.Component<Props> {
  render() {
    const {
      transparent,
      titlebar,
      width,
      toggleWindowSize,
      handleMouseDown,
      removeWindow
    } = this.props;

    if (transparent || !titlebar.use) {
      return null;
    }

    if (titlebar.component) {
      return <titlebar.component {...this.props} />;
    }

    return (
      <div
        className={styles.titlebar}
        style={{
          width
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
