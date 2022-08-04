import React from "react";
import PropTypes from 'prop-types';

import { ImgGallery } from "./ImgGallery.styled";
import {ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"

export function ImageGallery  ({hits, openModal }) 
          {return (<ImgGallery className="gallery" >        
           {hits.map(({ id, webformatURL, tags, largeImageURL}) => 
               <ImageGalleryItem
                   key={id}
                   webformatURL={webformatURL}
                   tag={tags} 
                   openModal={openModal}
                   largeImageURL={largeImageURL}
                   />
            )}     
        </ImgGallery>)}
        
   
ImageGallery.propTypes = {
    hits: PropTypes.array.isRequired,
    itemName: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
};
 