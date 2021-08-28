const ImageGalleryItem = ({
  url,
  tags,
  toggleModal,
  handleSetLargeImageURL,
  largeImageURL,
}) => {
  const handleClick = e => {
    toggleModal();
    handleSetLargeImageURL({ largeImageURL, tags });
  };

  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt={tags}
        className="ImageGalleryItem-image"
        onClick={handleClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
