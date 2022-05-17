import React, { useState, useRef } from 'react';
import ButtonType from '../enums/button-type';
import AudioPlayer from './audio-player';
import Button from './button';
import MintIcon from '../assets/icons/mint-icon.svg';
import RecordIcon from '../assets/icons/record-icon.svg';
import BackgroundColorType from '../enums/background-color-type';
import useInViewOnce from '../lib/use-in-view-once';
import classNames from 'classnames';
import { DeemoContractHelper } from '../lib/deemo-contract-helper';
import { useContract, useSigner } from 'wagmi';
import deemoContract from '../contracts/DeemoNFT.json';
import Spinner from './spinner';
import Link from 'next/link';

const CreateDeemoCard = () => {
  const [audioURL, setAudioURL] = useState<string>('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [shouldShowSpinner, setShouldShowSpinner] = useState(false);
  const [hasBeenMinted, setHasBeenMinted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: '0xaF9884b0c98C9Dc3f9fD495Dd986a78AdC61b904',
    contractInterface: deemoContract.abi,
    signerOrProvider: signer,
  });
  const [ref, isVisible] = useInViewOnce();

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
    try {
      setShouldShowSpinner(true);
      if (!audioFile)
        throw new Error('No audio file found which could be uploaded');
      const deemoContractHelper = new DeemoContractHelper(contract);
      await deemoContractHelper.mintNFT(title, audioFile);
      setHasBeenMinted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setShouldShowSpinner(false);
    }
  };

  return (
    <>
      {shouldShowSpinner && (
        <div className="fixed inset-0 bg-[rgba(0,_0,_0,_0.5)] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Spinner />
          </div>
        </div>
      )}
      <article
        ref={ref}
        className={classNames(
          'py-8 px-3 bg-secondary rounded-xl w-full max-w-md mx-auto space-y-6 opacity-0 transition-opacity duration-500',
          {
            'opacity-100': isVisible,
          }
        )}
      >
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
      {hasBeenMinted && (
        <p className="text-secondary text-center mt-4">
          Hooray, it's been minted!
          <br /> Head over to{' '}
          <Link href="/deemos">
            <a className="underline uppercase">All Deemos</a>
          </Link>{' '}
          to see your freshly minted NFT!
        </p>
      )}
    </>
  );
};

export default CreateDeemoCard;
