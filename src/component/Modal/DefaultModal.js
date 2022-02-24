import React from 'react';
import {Button, Modal} from 'native-base';
export const DefaultModal = props => {
  const {showModal, onClose, children, onSave, title} = props;
  return (
    <>
      <Modal avoidKeyboard isOpen={showModal} onClose={() => onClose(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>{children}</Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  onClose(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  onSave();
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DefaultModal;
