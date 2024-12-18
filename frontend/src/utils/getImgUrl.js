function getImgUrl(imagePath) {
  const backendBaseUrl = "http://localhost:5000";
  return `${backendBaseUrl}/${imagePath}`;
}

export default getImgUrl;
