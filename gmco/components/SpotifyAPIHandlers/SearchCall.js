const SearchCall = async (accessToken, search) => {
  const response = await fetch(
    `https://api.spotify.com/v1/search?query=${search}&type=track`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    }
  );
  const data = await response.json();
  return data;
};

export default SearchCall;
