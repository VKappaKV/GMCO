const GetCategories = async (access_token) => {
  const url = "https://api.spotify.com/v1/browse/categories?limit=50";
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  });
  const data = await response.json();
  console.log("la richiesta è : ", url);
  return data;
};

export default GetCategories;
