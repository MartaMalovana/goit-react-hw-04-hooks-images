import { createPortal } from "react-dom";
import {Overlay, ModalImage, Button} from './Modal.styled';

const modalRoot = document.querySelector('#root-modal');

export default function Modal ({onClick, modalImg}) {

    const handleClick = () => {
        onClick();
    }

    return createPortal(
        <Overlay className="overlay" onClick={handleClick}>
            <ModalImage className="modal">
                <img src={modalImg} alt="" />
            </ModalImage>
            <Button type="button">CLOSE</Button>
        </Overlay>, modalRoot
    );
}