import Link from 'next/link';
import React from 'react';
import DeemoLogo from '../assets/icons/deemo-logo.svg';
import MenuIcon from '../assets/icons/menu-icon.svg';
import { useState } from 'react';
import classNames from 'classnames';
import { useRouter } from 'next/router';

const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();

  let path = router.pathname;

  if ('id' in router.query && typeof router.query.id === 'string') {
    path = path.replace('[id]', router.query.id);
  }

  const toggleDropdownMenu = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <header className="fixed inset-x-0 shadow bg-secondary">
      <div className="container md:flex md:justify-between md:items-center">
        <div className="flex justify-between items-center py-3">
          <Link href="/">
            <a onClick={() => setIsExpanded(false)}>
              <DeemoLogo />
            </a>
          </Link>
          <button className="md:hidden" onClick={toggleDropdownMenu}>
            <MenuIcon />
          </button>
        </div>
        <ul
          className={classNames(
            'py-6 md:py-0 md:gap-8',
            {
              hidden: !isExpanded,
            },
            'md:flex'
          )}
        >
          <li>
            <Link href="/">
              <a
                className={classNames(
                  'uppercase text-secondary tracking-wider py-2 block text-center relative',
                  {
                    'before:block before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-accentFrom before:to-accentTo':
                      path === '/',
                  }
                )}
                onClick={() => setIsExpanded(false)}
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link href="/deemos/new">
              <a
                className={classNames(
                  'uppercase text-secondary tracking-wider py-2 block text-center relative',
                  {
                    'before:block before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-accentFrom before:to-accentTo':
                      path === '/deemos/new',
                  }
                )}
                onClick={() => setIsExpanded(false)}
              >
                Create Deemo
              </a>
            </Link>
          </li>
          <li>
            <Link href="/deemos">
              <a
                className={classNames(
                  'uppercase text-secondary tracking-wider py-2 block text-center relative',
                  {
                    'before:block before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-accentFrom before:to-accentTo':
                      path === '/deemos',
                  }
                )}
                onClick={() => setIsExpanded(false)}
              >
                All&nbsp;Deemos
              </a>
            </Link>
          </li>
          <li>
            <Link href="/users/0x94aD4e4E11800B8df7f5c848367E0c40Decb699B">
              <a
                className={classNames(
                  'uppercase text-secondary tracking-wider py-2 block text-center relative',
                  {
                    'before:block before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-2 before:h-2 before:rounded-full before:bg-gradient-to-r before:from-accentFrom before:to-accentTo':
                      path ===
                      '/users/0x94aD4e4E11800B8df7f5c848367E0c40Decb699B',
                  }
                )}
                onClick={() => setIsExpanded(false)}
              >
                Profile
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
