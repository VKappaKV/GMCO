const AuthTokenCall = () => {
  const client_id = "e36e1d9681c6419bb61c3e9638d2b917";
  const client_secret = "acf8a0b68ff04eb096c4c27f0cd6ebf5";
  var url = "https://accounts.spotify.com/api/token";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  })
    .then((response) => response.json())
    .then((tokenResponse) => {
      console.log(tokenResponse.access_token);
    });

  return;
};

export default AuthTokenCall;
