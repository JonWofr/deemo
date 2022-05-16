import Deemo from '../models/deemo';
import Link from 'next/link';
import Button from './button';
import OpenSeaIcon from '../assets/icons/opensea-icon.svg';
import ButtonType from '../enums/button-type';
import AudioPlayer from './audio-player';
import { abbreviateHash } from '../lib/deemos';

type Props = {
  deemo: Deemo;
};

const DeemoCard = ({ deemo }: Props) => {
  const parseDate = (mintedAt: number) => {
    const date = new Date(mintedAt);
    return date.toLocaleDateString();
  };

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
      <AudioPlayer audioURL={deemo.audioCID} />
      <hr className="border-t-muted my-6" />
      <footer className="flex justify-end">
        <a href={deemo.openSeaURL} target="_blank">
          <Button Icon={OpenSeaIcon} label="OpenSea" type={ButtonType.WHITE} />
        </a>
      </footer>
    </article>
  );
};

export default DeemoCard;
