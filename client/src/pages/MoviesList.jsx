import React, { Component } from 'react';
import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';
import { Styles, Update, Delete } from './Styles';

import api from '../api';

class UpdateMovie extends Component {
  updateUser = event => {
    event.preventDefault();
    window.location.href = `/movies/update/${this.props.id}`;
  };
  render() {
    return <Update onClick={this.updateUser}> Update</Update>;
  }
}

class DeleteMovie extends Component {
  deleteUser = event => {
    event.preventDefault();
    if (
      window.confirm(
        ` Do you want to delete the movie ${this.props.name} permanently?`
      )
    ) {
      api.deleteMovieById(this.props.id);
      window.location.reload();
    }
  };
  render() {
    return <Delete onClick={this.deleteUser}> Delete</Delete>;
  }
}

class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      columns: [],
      isLoading: false
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    await api.getAllMovies().then(movies => {
      this.setState({
        movies: movies.data.data,
        isLoading: false
      });
    });
  }

  render() {
    const { movies, isLoading } = this.state;

    //console.log('TCL: MoviesList -> render -> movies', movies);
    //console.log(`Props = ${movies}`);
    // Columns
    const columns = [
      //{ Header: 'ID', accessor: '_id',  },
      {
        Header: 'Name',
        accessor: 'name',
        filterable: true
      },
      {
        Header: 'Rating',
        accessor: 'rating'
      },
      {
        Header: 'Time',
        accessor: 'time',
        Cell: props => <span>{props.value.join(' / ')}</span>,
      },
      {
        Header: 'Delete',
        accessor: '',
        Cell: function(props) {
          return (
            <span>
              <DeleteMovie id={props.original._id} name={props.original.name}  />
            </span>
          );
        }
      },
      {
        Header: 'Update',
        accessor: '',
        Cell: function(props) {
          console.log(props.original.name)
          return (
            <span>
              <UpdateMovie id={props.original._id} name={props.original.name}  />
            </span>
          );
        }
      }
    ];

    let showTable = true;
    if (!movies.length) {
      showTable = false;
    }

    return (
      <Styles>
        {showTable && (
          <ReactTable
            data={movies}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Styles>
    );
  }
}

export default MoviesList;
