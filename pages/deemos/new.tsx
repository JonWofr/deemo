import React, { useState } from 'react';

const NewDeemo = () => {
  const [audioSrc, setAudioSrc] = useState<string>();

  const onChangeFileInput = async (files: FileList | null) => {
    if (!files) return;
    const audioDataURL = await readFileAsDataURL(files[0]);
    setAudioSrc(audioDataURL);
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

  return (
    <div>
      {/*       <input
        type="file"
        accept="audio/*"
        capture
        onChange={(event) => onChangeFileInput(event.target.files)}
      />
      <audio src={audioSrc} controls /> */}
    </div>
  );
};

export default NewDeemo;
