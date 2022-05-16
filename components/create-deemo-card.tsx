import Link from 'next/link';
import React from 'react';
import ButtonType from '../enums/button-type';
import { abbreviateHash } from '../lib/deemos';
import AudioPlayer from './audio-player';
import Button from './button';
import OpenSeaIcon from '../assets/icons/opensea-icon.svg';
import { deemos } from '../pages/deemos';

const CreateDeemoCard = () => {
  const parseDate = (mintedAt: number) => {
    const date = new Date(mintedAt);
    return date.toLocaleDateString();
  };
  const deemo = deemos[0];

  return (
    <article className="py-8 px-3 bg-secondary rounded-xl">
      <header className="flex justify-between gap-4 mb-4">
        <div className="flex flex-col">
          <Link href={`/users/${deemo.owner}`}>
            <a className="text-secondary text-xs underline">
              {abbreviateHash(deemo.owner)}
            </a>
          </Link>
          <h2 className="text-2xl text-primary">{deemo.title}</h2>
        </div>
        <time className="text-secondary">{parseDate(deemo.mintedAt)}</time>
      </header>
      <div className="body">
        <AudioPlayer audioURL={deemo.audioCID} />
      </div>
      <hr className="h-px bg-[rgb(99,99,130)] my-6" />
      <footer className="flex justify-end">
        <a href={deemo.openSeaURL} target="_blank">
          <Button Icon={OpenSeaIcon} label="OpenSea" type={ButtonType.WHITE} />
        </a>
      </footer>
    </article>
  );
};

export default CreateDeemoCard;
