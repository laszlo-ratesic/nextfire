import Link from 'next/link';
import Image from 'next/image';

// Top Navbar
export default function Navbar() {
  const user = null;
  const username = null;

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className='btn-logo'>FEED</button>
          </Link>
        </li>

        {/* user signed in with username */}
        {username && (
          <>
            <li className='push-left'>
              <Link href="/admin">
                <button className='btn-blue'>Write Posts</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <Image
                  src={user?.photoURL}
                  alt={`${username}'s avatar photo`}
                />
              </Link>
            </li>
          </>
        )}

        {/* user not signed in OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className='btn-blue'>Log in</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
