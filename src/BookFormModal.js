import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class BookFormModal extends Component {
    render() {
        return (
            <div>
                <Modal show={this.props.ShowForm} onHide={this.props.closeForm} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <label>Book Name: </label>
                            <input type="text" onChange={(e) => { this.props.getBookName(e) }} />
                            <br />
                            <label>Book Description: </label>
                            <input type="text" onChange={(e) => { this.props.getBookDescription(e) }} />
                            <br />
                            <label>Book Status: </label>
                            <input type="text" onChange={(e) => { this.props.getBookStatus(e) }} />
                            <br />
                            {/* <button type="submit" onClick={this.props.getNewBook}>Add</button> */}
                            {/* <button onClick={this.props.updateForm(idx)}>update Form</button> */}
                        </form>
                    </Modal.Body>

                    <Modal.Footer> {console.log(this.props.getNewBook)}
                        <Button variant="primary" onClick={this.props.getNewBook}>
                            Add
          </Button>
                        <Button variant="secondary" onClick={this.props.closeForm}>
                            Close
          </Button>

                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default BookFormModal