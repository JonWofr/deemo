import React, { useState, useRef, useEffect } from 'react';
import Button from './button';
import PlayIcon from '../assets/icons/play-icon.svg';
import PauseIcon from '../assets/icons/pause-icon.svg';
import AudioTrack from './audio-track';
import AudioPlayState from '../enums/audio-play-state';

type Props = {
  audioURL: string;
};

const AudioPlayer = ({ audioURL }: Props) => {
  const [playState, setPlayState] = useState<AudioPlayState>(
    AudioPlayState.PAUSED
  );
  const [progressInPercent, setProgressInPercent] = useState<number>(0);
  const [durationInS, setDurationInS] = useState<number>(0);
  const [currentTimeInS, setCurrentTimeInS] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    initialiseAudioElement();
  }, []);

  const initialiseAudioElement = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (hasLoadedMetadata(audioElement)) {
      setDurationInS(audioElement.duration);
    } else {
      audioElement.addEventListener('loadedmetadata', () => {
        setDurationInS(audioElement.duration);
      });
    }

    audioElement.addEventListener('timeupdate', () => {
      const progressInPercent = Math.floor(
        (audioElement.currentTime / audioElement.duration) * 100
      );

      setProgressInPercent(progressInPercent);
      setCurrentTimeInS(audioElement.currentTime);
    });

    audioElement.addEventListener('ended', () => {
      setPlayState(AudioPlayState.PAUSED);
    });
  };

  const hasLoadedMetadata = (audioElement: HTMLAudioElement) => {
    return audioElement.readyState > 0;
  };

  const onChangeAudioTrack = (progressInPercent: number) => {
    const currentTimeInS = durationInS * (progressInPercent / 100);

    setCurrentTimeInS(currentTimeInS);
    setProgressInPercent(progressInPercent);
  };

  const onMouseUpAudioTrack = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    audioElement.currentTime = currentTimeInS;
  };

  const changePlayState = (playState: AudioPlayState) => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (playState === AudioPlayState.PAUSED) {
      audioElement.pause();
    } else if (playState === AudioPlayState.RUNNING) {
      audioElement.play();
    }

    setPlayState(playState);
  };

  const renderButton = () => {
    switch (playState) {
      case AudioPlayState.PAUSED:
        return (
          <Button
            Icon={PlayIcon}
            onClick={() => changePlayState(AudioPlayState.RUNNING)}
          />
        );
      case AudioPlayState.RUNNING:
        return (
          <Button
            Icon={PauseIcon}
            onClick={() => changePlayState(AudioPlayState.PAUSED)}
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-3 bg-primary rounded-full py-2 px-4">
      <audio src={audioURL} preload="metadata" ref={audioRef} />
      {renderButton()}
      <div className="flex-1">
        <AudioTrack
          progress={progressInPercent}
          onChange={onChangeAudioTrack}
          onMouseUp={onMouseUpAudioTrack}
        />
      </div>
      <p className="w-12 text-center font-mono font-light text-xs text-secondary">
        {Math.floor(currentTimeInS)}/{Math.floor(durationInS)}
      </p>
    </div>
  );
};

export default AudioPlayer;
