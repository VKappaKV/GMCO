const GetCategories = async (access_token) => {
  const response = await fetch("https://api.spotify.com/v1/browse/categories", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
  });
  const data = await response.json();
  return data;
};

export default GetCategories;
