import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  type,
  message,
  isLoading,
}) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => confirmModal(type, id)}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Delete"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
