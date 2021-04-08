const { REACT_APP_API_URL, REACT_APP_GOOGLE_API_KEY } = process.env as Record<string, string>;

export const envs = {
  apiURL: REACT_APP_API_URL,
  googleAPIKey: REACT_APP_GOOGLE_API_KEY,
};
