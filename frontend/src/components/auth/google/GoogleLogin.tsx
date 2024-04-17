import useLoadLib from "./useLoadLib.ts";
import {useEffect, useRef} from "react";
import {SignInResponseCallback} from "./types.ts";

export default function GoogleLogin({
  onSignInResponse
}: {
  onSignInResponse: SignInResponseCallback
}) {
  const {loaded, error} = useLoadLib();
  const containerRef = useRef(null);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: onSignInResponse,
    });

    window.google.accounts.id.renderButton(containerRef.current, {
      type: 'standard',
      size: 'large',
    });

  }, [loaded]);

  return <div>
    <div ref={containerRef}></div>
    {error && (
      <p className='error'>Something went wrong. Could not login with Google.</p>
    )}
  </div>;
}
