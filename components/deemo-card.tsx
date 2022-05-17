import Deemo from '../models/deemo';
import Button from './button';
import OpenSeaIcon from '../assets/icons/opensea-icon.svg';
import ButtonType from '../enums/button-type';
import AudioPlayer from './audio-player';
import { abbreviateHash } from '../lib/helper-functions';
import BackgroundColorType from '../enums/background-color-type';
import useInViewOnce from '../lib/use-in-view-once';
import classNames from 'classnames';

type Props = {
  deemo: Deemo;
};

const DeemoCard = ({ deemo }: Props) => {
  const [ref, isVisible] = useInViewOnce();

  const parseDate = (mintedAt: number) => {
    const date = new Date(mintedAt);
    return date.toLocaleDateString();
  };

  return (
    <article
      ref={ref}
      className={classNames(
        'py-8 px-3 bg-secondary rounded-xl opacity-0 transition-opacity duration-500',
        {
          'opacity-100': isVisible,
        }
      )}
    >
      <header className="flex justify-between gap-4 mb-4">
        <div className="flex flex-col">
          <a
            href={`https://testnets.opensea.io/${deemo.owner}`}
            className="text-secondary text-xs underline"
            target="_blank"
            rel="noreferrer"
          >
            {abbreviateHash(deemo.owner)}
          </a>
          <h2 className="text-2xl text-primary">{deemo.title}</h2>
        </div>
        <time className="text-secondary">{parseDate(deemo.mintedAt)}</time>
      </header>
      <AudioPlayer audioURL={deemo.audioCID} />
      <hr className="border-t-muted my-6" />
      <footer className="flex justify-end">
        <a href={deemo.openSeaURL} target="_blank" rel="noreferrer">
          <Button
            Icon={OpenSeaIcon}
            label="OpenSea"
            type={ButtonType.WHITE}
            backgroundColorType={BackgroundColorType.SECONDARY}
          />
        </a>
      </footer>
    </article>
  );
};

export default DeemoCard;
