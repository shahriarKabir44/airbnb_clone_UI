import React from 'react';
import Modal from '../../../../components/Shared/Modal';

function ConfirmationModal({ modalStatus, setModalStatus, onConfirm, onCancel, children }) {
    return (
        <div>
            <Modal modalStatus={modalStatus} setModalStatus={setModalStatus} isSticky={true} >
                {children}
                <div className="buttons">
                    <button className="confirm confirmationbtn" onClick={() => { onConfirm() }} >Proceed</button>
                    {onCancel && <button className="cancel confirmationbtn" onClick={() => { onCancel() }} >Cancel</button>}
                </div>
            </Modal>
            <style jsx="true">
                {`
                    .buttons{
                        justify-content: space-between;
                        display: flex;
                    }
                    .confirm{
                        background: rgb(58 159 33)
                    }
                    .cancel{
                        background: rgb(239 19 19)
                    }
                `}
            </style>
        </div>
    );
}

export default ConfirmationModal;