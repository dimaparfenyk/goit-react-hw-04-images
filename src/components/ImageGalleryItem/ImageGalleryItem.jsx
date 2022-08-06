import React from "react";
import PropTypes from 'prop-types';
import { GalleryItem, ImgItem } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, openModal }) => (
  <GalleryItem className="gallery-item">
    <ImgItem
      src={webformatURL}
      alt={tags}
      data-large={largeImageURL}
      onClick={openModal}
    />
  </GalleryItem>);


ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tag: PropTypes.string,
  webformatURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};