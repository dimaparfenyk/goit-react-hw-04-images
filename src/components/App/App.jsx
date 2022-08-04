import  { Component } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

import searchImg from "fetchApi/fetch";

import { SearchBar } from "../SearchBar/SearchBar";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Modal } from "../Modal/Modal";
import { LoadMoreBtn } from "components/Button/Button";
import { Loader } from "components/Loader/Loader";
import { Container } from "./App.styled";

export class App extends Component {
  state = {
    itemName: '',
    hits: [],
    totalHits: 0,
    page: 1,
    preLoading: false,
    showModal: false,
    biggerImageUrl: '',
    tag:'image',
  }
   
  componentDidUpdate(_, prevState) {
    const prevName = prevState.itemName;
    const currentName = this.state.itemName;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevName !== currentName) {
      this.setState({ page: 1 });
    }

    if (prevName !== currentName ||
      prevPage !== currentPage) {
      this.setState({ preLoading: true });
       
      searchImg(currentName, currentPage)
        .then(({ hits, totalHits }) => {
      
          this.setState({ totalHits });
          
          if (prevName === currentName) {
            this.setState(prevState => ({
              hits: [...prevState.hits, ...hits],
            }));
          }
          if (prevName !== currentName) {
            this.setState({ hits });
          }
        })
        .catch(error => toast.error(error.message, {
          position: 'top-right',
          autoClose: 4000,
          closeOnClick: true
            
        }))
        .finally(() => this.setState({ preLoading: false }));
    }
    if (this.state.hits.length>=this.state.totalHits && this.state.hits.length!==0) {
      toast('There are no more pictures with such query!', {
        position: 'top-right',
        autoClose: 4000,
        closeOnClick: true,
      });
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }
    ));
  };

  handleFormSubmit = name => {
    this.setState({
      itemName: name,
      page: 1,
      hits: [],
    })
  };

  toggleModal = () => {
     this.setState(({ showModal }) => (
       {
         showModal: !showModal
       }));
   };
  
  openModal = e => {
    this.setState({
      biggerImageUrl: e.currentTarget.src,
      alt: e.target.alt
    })
    this.toggleModal();
  };

  render() {
    const {itemName, hits,totalHits, preLoading, showModal, biggerImageUrl, tag } = this.state;
     
    return (
      <Container>
        <SearchBar totalHits={totalHits} onSubmit={this.handleFormSubmit} />
        <ToastContainer/>
        {!showModal|| <Modal/>}
        <ImageGallery
          itemName={itemName}
          hits={hits}
          openModal={this.openModal} />
        {hits.length===0 || hits.length>=totalHits || <LoadMoreBtn onClick={this.onLoadMore} />}
        {preLoading && <Loader />}
        {showModal && (<Modal
          onClose={this.toggleModal}
          bigImage={biggerImageUrl}
          tag={tag}
          />
        )}
      </Container>
    )
  }
}

