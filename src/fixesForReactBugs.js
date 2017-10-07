// THIS SHOULD DEFINITLY NOT BE HERE
// THIS IS A WORKAROUND FOR REACT16 DESTROYING BOOTSTRAP's MODAL
import { Modal } from 'react-overlays';

Modal.prototype.componentWillMount = function () {
    this.focus = () => {};
};
// REMOVE THIS ASA https://github.com/react-bootstrap/react-bootstrap/issues/2812 is fixed!