import React, { useState, useRef } from 'react';
import ButtonType from '../enums/button-type';
import AudioPlayer from './audio-player';
import Button from './button';
import MintIcon from '../assets/icons/mint-icon.svg';
import RecordIcon from '../assets/icons/record-icon.svg';
import BackgroundColorType from '../enums/background-color-type';

const CreateDeemoCard = () => {
  const [audioURL, setAudioURL] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChangeFileInput = async (files: FileList | null) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;
    setAudioFile(file);

    const audioDataURL = await readFileAsDataURL(file);
    setAudioURL(audioDataURL);
  };

  const readFileAsDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        resolve(fileReader.result as string);
      });
      fileReader.addEventListener('error', reject);
      fileReader.readAsDataURL(file);
    });

  const onClickSelectRecordingButton = () => {
    const fileInput = fileInputRef.current;
    if (!fileInput) return;

    fileInput.click();
  };

  const onClickMintButton = async () => {
    if (!audioFile)
      throw new Error('No audio file found which could be uploaded');
  };

  return (
    <article className="py-8 px-3 bg-secondary rounded-xl w-full max-w-md mx-auto space-y-6">
      <input
        type="text"
        className="bg-transparent block w-full px-2 py-1 border-b border-b-muted text-secondary"
        placeholder="Deemo title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="space-y-4">
        <Button
          Icon={RecordIcon}
          label="Select Recording"
          onClick={onClickSelectRecordingButton}
          backgroundColorType={BackgroundColorType.SECONDARY}
        />
        <input
          hidden
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          capture
          onChange={(event) => onChangeFileInput(event.target.files)}
        />
        <AudioPlayer audioURL={audioURL} />
      </div>
      <hr className="border-t-muted" />
      <footer className="flex justify-end">
        <Button
          Icon={MintIcon}
          label="Mint"
          type={ButtonType.WHITE}
          isDisabled={!(title && audioURL)}
          onClick={onClickMintButton}
          backgroundColorType={BackgroundColorType.SECONDARY}
        />
      </footer>
    </article>
  );
};

export default CreateDeemoCard;
