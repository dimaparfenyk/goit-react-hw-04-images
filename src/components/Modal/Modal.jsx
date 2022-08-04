import {Component} from "react";
import { Overlay, ModalBox } from "./Modal.styled";
import PropTypes from 'prop-types';

export class Modal extends Component{
 componentDidMount() {
         window.addEventListener('keydown', this.props.onClose);
    };
    
      componentWillUnmount() {
          window.removeEventListener('keydown', this.props.onClose);
      }

     onBackdropClick = e => {
    if (e.target === e.currentTarget || e.code === 'Escape') {
      this.props.onClose();
    }
  };
render(){
    return (<Overlay className="overlay" onClick={this.onBackdropClick}>
        <ModalBox className="modal">
            <img src={this.props.bigImage} alt={this.props.alt} />
        </ModalBox>
        </Overlay>)
    };
};

Modal.propTypes = {
    bigImage: PropTypes.string,
    onClose: PropTypes.func,
    tag:PropTypes.string,
}