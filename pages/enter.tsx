import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth, googleAuthProvider } from '../lib/firebase';

export default function EnterPage(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <>
            <UsernameForm />
            <SignOutButton />
          </>
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with the Google button
function SignInButton() {
  const signInWithgoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button className="btn-google" onClick={signInWithgoogle}>
      <img src={'/google.png'} alt="Google Logo" />
      <span style={{ marginLeft: '10px' }}> Sign in with Google</span>
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return <></>;
}
