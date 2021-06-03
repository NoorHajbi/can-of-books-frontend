import React, { Component } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
class UpdateForm extends Component {
    render() {
        return (
            <>
                <Modal show={this.props.ShowForm} onHide={this.props.closeForm} animation={true}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form style={{ width: '20rem' }}>
                            <Form.Group>
                                <Form.Label>Book Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Book Name"
                                    onChange={(e) => { this.props.getBookName(e) }} value={this.props.bookName}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Book Status</Form.Label>
                                <Form.Control type="text" placeholder="Password"
                                    onChange={(e) => { this.props.getBookStatus(e) }} value={this.props.bookStatus}
                                />
                            </Form.Group>

                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    onChange={(e) => { this.props.getBookDescription(e) }} value={this.props.bookDescription}
                                />
                            </Form.Group>
                            <Button onClick={this.props.updateBook}> Update</Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer> {console.log(this.props.getNewBook)}
                        <Button variant="secondary" onClick={this.props.closeForm}>
                            Close
</Button>

                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default UpdateForm
