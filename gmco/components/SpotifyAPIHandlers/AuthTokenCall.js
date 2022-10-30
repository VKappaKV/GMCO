const AuthTokenCall = async () => {
  const client_id = "e36e1d9681c6419bb61c3e9638d2b917";
  const client_secret = "acf8a0b68ff04eb096c4c27f0cd6ebf5";
  const url = "https://accounts.spotify.com/api/token";

  const result = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  });
  const data = await result.json();
  return data.access_token;
};

export default AuthTokenCall;
