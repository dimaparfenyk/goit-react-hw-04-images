import  { useState, useEffect} from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import searchImg from "fetchApi/fetch";

import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { LoadMoreBtn } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Container } from "./App.styled";

export const App = () => {
  const [itemName, setItemName] = useState('');
  const [hits, setHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [preLoading, setPreLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [biggerImageUrl, setBiggerImageUrl] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    setPreLoading(true);

    searchImg(itemName, page)
      .then(({ hits, totalHits }) => {
        setTotalHits(totalHits);
        if (itemName !== '') {
          setHits(prevState => ([...prevState, ...hits])
          );
        };
      })
      .catch(error => toast.error(error.message, {
        position: 'top-right',
        autoClose: 4000,
        closeOnClick: true,
      }))
      .finally(() => setPreLoading(false));
  }, [itemName, page]);

  useEffect(() => {
    if (hits.length >= totalHits&& hits.length!==0) {
      toast('There are no more pictures with such query!', {
        position: 'top-right',
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  },[hits.length, totalHits]);
  
  const onLoadMore = () => {
    setPreLoading(true);
    setPage(prevState => prevState + 1);
  };

  const handleFormSubmit = name => {
    setItemName(name);
    setPage(1);
    setHits([]);
  };

  const onClose = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      setShowModal(!showModal);
    }
  };
  
  const openModal = e => {
    setBiggerImageUrl(e.currentTarget.src);
    setTag(e.target.alt);
    setShowModal(!showModal);
  };
  
  return (
    <Container>
      <SearchBar totalHits={totalHits} onSubmit={handleFormSubmit} />
      <ToastContainer/>
      {!showModal || <Modal />}
      <ImageGallery
        itemName={itemName}
        hits={hits}
        openModal={openModal} />
      {hits.length === 0 || hits.length >= totalHits || <LoadMoreBtn onClick={onLoadMore} />}
      {preLoading && <Loader />}
      {showModal && (<Modal
        onClose={onClose}
        bigImage={biggerImageUrl}
        tag={tag}
      />
      )}
    </Container>
  );
};


