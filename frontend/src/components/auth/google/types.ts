declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: Function,
          renderButton: Function,
        }
      }
    }
  }
}

export type SignInResponse = {
  clientId: string;
  credential: string;
}

export type SignInResponseCallback = (response: SignInResponse) => void;
