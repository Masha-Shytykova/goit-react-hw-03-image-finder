const ImageGalleryItem = ({
  url,
  toggleModal,
  handleSetLargeImageURL,
  largeImageURL,
}) => {
  const handleClick = e => {
    toggleModal();
    handleSetLargeImageURL(largeImageURL);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt=""
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
