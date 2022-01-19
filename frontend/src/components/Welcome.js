import "../App.css";
import "firebase/auth";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";

function Welcome() {
  const AnonLogin = () => {
    console.log("logging in");
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  return (
    <div className="h-screen navy-background">
      <div className="h-px"></div>
      <h1 className="text-white robot text-6xl  mw mx-auto text-center mt-16">
        Welcome to Quizzed
      </h1>
      <ul className="text-lg grey-text text-center flex flex-col items-center my-16 list-disc">
        <li className="mw text-center">
          Quizzed is a website that tests your knowledge on a number of subjects
        </li>
        <li className="my-8 mw text-center">
          Compete against others and try to reach the top of the leaderboards!
        </li>
        <li className="mw text-center">
          Play anonymously or use an account to save progress
        </li>
      </ul>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        <button
          onClick={() => {
            AnonLogin();
          }}
          className="py-2 px-3 w-40 h-20 rounded-2xl text-xl grey-background hover:opacity-80"
        >
          Play anonymously
        </button>
        <button
          onClick={() => {
            googleLogin();
          }}
          className="py-2 px-3 w-40 h-20 rounded-2xl text-xl grey-background hover:opacity-80"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Welcome;
