import React from 'react';
import styles from './audio-track.module.scss';

type Props = {
  progress: number;
  onChange: (progress: number) => void;
  onMouseUp: () => void;
};

const AudioTrack = ({ progress, onChange, onMouseUp }: Props) => {
  return (
    <input
      type="range"
      className={styles.audioTrack}
      value={progress}
      onChange={(event) => onChange(parseInt(event.target.value))}
      onMouseUp={onMouseUp}
      onTouchEnd={onMouseUp}
      style={{
        backgroundSize: `${progress}% 100%`,
      }}
    />
  );
};

export default AudioTrack;
