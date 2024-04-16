interface AuthProvider {
  signin(username: string): Promise<void>;
  signout(): Promise<void>;
  getUserName(): string | null;
}

export const authProvider: AuthProvider = {
  async signin(username: string): Promise<void> {
    await new Promise((r) => setTimeout(r, 500));
    localStorage.setItem('username', username);
  },

  async signout() {
    await new Promise((r) => setTimeout(r, 500));
    localStorage.removeItem('username');
  },

  getUserName() {
    return localStorage.getItem('username');
  },
};
