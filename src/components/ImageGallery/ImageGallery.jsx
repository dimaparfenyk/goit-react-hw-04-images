import React from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid'

import { ImgGallery } from "./ImgGallery.styled";
import {ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"

export const ImageGallery = ({ hits, openModal }) => (
    <ImgGallery className="gallery" >
        {hits.map(({  webformatURL, tags, largeImageURL }) =>
            <ImageGalleryItem
                key={nanoid()}
                webformatURL={webformatURL}
                tag={tags}
                openModal={openModal}
                largeImageURL={largeImageURL}
            />
        )}
    </ImgGallery>);
        
   
ImageGallery.propTypes = {
    hits: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};
 