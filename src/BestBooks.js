import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel'

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      show: false,
      server: process.env.REACT_APP_MONGO_SERVER,
    }
  }
  componentDidMount = async () => {
    try {
      let serverURL = await axios.get(`${this.state.server}?email=${this.props.auth0.user.email}`);
      console.log(serverURL);
      console.log(serverURL.data[0].books)
      this.setState({
        books: serverURL.data[0].books,
        show: true
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        {this.state.show &&

          <>
            <Carousel>
              {this.state.books.map((data, idx) => {
                return (
                  <Carousel.Item style={{ width: '18rem'}} key={idx}>
                    <Carousel.Caption style={{ color: 'black'}}>
                      <h1>Name: {data.name} </h1>
                      {console.log(data.name)}
                      <p>Description: {data.description}</p>
                      {console.log(data.description)}
                      <p>Status: {data.status} </p>
                        {console.log(data.status)}
                    </Carousel.Caption>
                  </Carousel.Item>
                )
              })
              }
            </Carousel>

          </>
        }
          </>
    )
  }
}

export default withAuth0(BestBooks);
