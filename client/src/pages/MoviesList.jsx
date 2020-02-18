import React, { Component } from 'react';
import { useTable } from 'react-table';
import { Styles } from './Styles';

import api from '../api';

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
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

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    await api.getAllMovies().then(movies => {
      this.setState({
        movies: movies.data.data,
        isLoading: false
      });
    });
  };

  render() {
    const { movies, isLoading } = this.state;
    console.log('TCL: MoviesList -> render -> movies', movies);

    // Columns
    const columns = [
      { Header: 'ID', accessor: '_id', filterable: true },
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Rating',
        accessor: 'rating'
      },
      {
        Header: 'Time',
        accessor: 'time'
      }
    ];

    let showTable = true;
    if (!movies.length) {
      showTable = false;
    }

    return (
      <Styles>
        {showTable && (
          <Table
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
