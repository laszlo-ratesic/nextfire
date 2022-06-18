import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { signOut } from 'firebase/auth';

// Top Navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">FEED</button>
          </Link>
        </li>

        {/* user signed in with username */}
        {user && (
          <>
            <li className="push-left">
              <button onClick={() => signOut}>Sign Out</button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-blue">Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img
                  src={user?.photoURL || '/hacker.png'}
                  alt={`${username}'s avatar photo`}
                />
              </Link>
            </li>
          </>
        )}

        {/* user not signed in OR has not created username */}
        {!user && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
