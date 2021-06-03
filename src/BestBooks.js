import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Card from 'react-bootstrap/Card';
import BookFormModal from './BookFormModal';
import UpdateForm from './UpdateForm';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showBestBooksComponent: false,
      server: process.env.REACT_APP_MONGO_SERVER,
      showFormModal: false,
      email: '',
      bookName: '',
      bookDescription: '',
      bookStatus: '',

      showUpdateStatus: false,
      index: 0
    }
  }



  updateBookName = (e) => this.setState({ bookName: e.target.value });
  updateBookDescription = (e) => this.setState({ bookDescription: e.target.value });
  updatebookStatus = (e) => this.setState({ bookStatus: e.target.value });

  getNewBook = async () => {
    const { user } = this.props.auth0;
    try {
      const bodyData = {
        email: user.email,
        bookName: this.state.bookName,
        bookDescription: this.state.bookDescription,
        bookStatus: this.state.bookStatus
      }
      const books = await axios.post(`${this.state.server}/books`, bodyData);
      console.log(books.data);
      this.setState({
        books: books.data
      });
      this.setState({
        showFormModal: false,
      });

    } catch (error) {
      console.log(error);
    }

  }
  deleteBook = async (index) => {
    // console.log(index);
    const { user } = this.props.auth0;
    const newArrayOfBooks = this.state.books.filter((books, idx) => {
      return idx !== index;
    });

    console.log(newArrayOfBooks);
    this.setState({
      books: newArrayOfBooks
    });

    const query = {
      email: user.email
    }

    await axios.delete(`${this.state.server}/books/${index}`, { params: query });
  }

  updateBook = async (e) => {
    e.preventDefault();
    const { user } = this.props.auth0;
    const bodyData = {
      email: user.email,
      bookName: this.state.bookName,
      bookDescription: this.state.bookDescription,
      bookStatus: this.state.bookStatus
    }
    let updatedBooks = await axios.put(`${this.state.server}/books/${this.state.index}`, bodyData);
    this.setState({
      books: updatedBooks.data
    })
  }
  //here
  showUpdateForm = (idx) => { //up11

    const selectedBooks = this.state.books.filter((val, index) => {
      return idx === index;
    })

    console.log(selectedBooks);

    this.setState({
      showUpdateStatus: true,
      index: idx,
      bookName: selectedBooks[0].name,
      bookDescription: selectedBooks[0].description,
      bookStatus: selectedBooks[0].status

    })
  }
  /*************************/


  /***********************/


  componentDidMount = async () => {
    try {
      let serverURL = await axios.get(`${this.state.server}/books?email=${this.props.auth0.user.email}`);
      console.log(serverURL);
      console.log(serverURL.data[0].books)
      this.setState({
        books: serverURL.data[0].books,
        showBestBooksComponent: true
      });
    } catch (error) {
      console.log(error);
    }
  }
  showForm = () => {
    this.setState({
      showFormModal: true,
    });

  }

  closeForm = () => { //call it with update
    this.setState({
      showFormModal: false,
      showUpdateStatus: false
    });
  }


  render() {
    console.log(this.state.books);
    return (
      <>

        {/* <Jumbotron> */}

        <button onClick={this.showForm}>Add Books</button>
        {this.state.showFormModal &&
          <>
            <BookFormModal
              getBookName={this.updateBookName}
              getBookDescription={this.updateBookDescription}
              getBookStatus={this.updatebookStatus}
              ShowForm={this.state.showFormModal}
              closeForm={this.closeForm}
              getNewBook={this.getNewBook}
            />
          </>
        }
        {this.state.showUpdateStatus &&
          <UpdateForm
            bookName={this.state.bookName}
            bookDescription={this.state.bookDescription}
            bookStatus={this.state.bookStatus}
            getBookName={this.updateBookName}
            getBookDescription={this.updateBookDescription}
            getBookStatus={this.updatebookStatus}
            updateBook={this.updateBook}
            closeForm={this.closeForm}
            ShowForm={this.state.showUpdateStatus}
          />
        }

        {this.state.showBestBooksComponent &&
          <>

            {this.state.books.map((data, index) => {
              return (
                <>
                  <Card style={{ width: '18rem' }} key={index}>
                    <Card.Body>
                      <Card.Title>Name: {data.name}</Card.Title>
                      <Card.Text>Description: {data.description}</Card.Text>
                      <Card.Text>Status: {data.status}</Card.Text>
                      <button onClick={() => { this.deleteBook(index) }}>Delete</button>
                      <button onClick={() => { this.showUpdateForm(index) }}>Update</button>

                    </Card.Body>
                  </Card>


                </>
              );

            })
            }
          </>
        }
        {/* </Jumbotron> */}
      </>
    )
  }
}

export default withAuth0(BestBooks);