import { useEffect} from "react";
import { Overlay, ModalBox } from "./Modal.styled";
import PropTypes from 'prop-types';

export const Modal = ({ bigImage, alt, onClose }) => {
  
useEffect(() => {
    window.addEventListener('keydown', onClose);
        return () => {
            window.removeEventListener('keydown', onClose);
        }
    }, [onClose]);

    return (
    <Overlay className="overlay" onClick={onClose}>
        <ModalBox className="modal">
            <img src={bigImage} alt={alt} />
        </ModalBox>
        </Overlay>)
    };

Modal.propTypes = {
    bigImage: PropTypes.string,
    onClose: PropTypes.func,
    tag:PropTypes.string,
}