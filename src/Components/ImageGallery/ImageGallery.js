import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ hits, toggleModal, handleSetLargeImageURL }) => {
  return (
    <ul className="ImageGallery">
      {hits.map(({ id, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          url={webformatURL}
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
          handleSetLargeImageURL={handleSetLargeImageURL}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
