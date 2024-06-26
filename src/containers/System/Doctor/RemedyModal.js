import React, { Component } from 'react';
import { connect } from "react-redux";
import './RemedyModal.scss';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }



    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            });
        }
    }

    handleSendRemedy = () => {
        this.props.sendRemedy(this.state);
    }

    render() {
        let { isOpenModel, closeRemedyModal, dataModal, sendRemedy } = this.props;
        return (
            <Modal
                isOpen={isOpenModel}
                className={'booking-modal-container'}
                size="md"
                centered>
                <div className='modal-header'>
                    <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                    <button type='button' className='close' aria-label='Close'
                        onClick={closeRemedyModal}
                    >
                        <span aria-hidden='true'>x</span>
                    </button>
                </div>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email bệnh nhân</label>
                            <input className='form-control' type='email' value={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)} />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chọn file đơn thuốc</label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImage(event)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleSendRemedy()}>
                        Gửi
                    </Button>
                    <Button color="secondary" onClick={closeRemedyModal}>
                        Hủy
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
