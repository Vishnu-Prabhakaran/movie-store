import React, { Component } from 'react';
import api from '../api';

import {
  Title,
  Wrapper,
  Label,
  InputText,
  AddButton,
  CancelButton
} from './Styles';

class MoviesUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      name: '',
      rating: '',
      time: ''
    };
  }
  handleChangeInputName = async event => {
    const name = event.target.value;
    this.setState({ name });
  };
  handleChangeInpuRating = async event => {
    const rating = event.target.validity.valid
      ? event.target.value
      : this.state.rating;

    this.setState({ rating });
  };
  handleChangeInputTime = async event => {
    const time = event.target.value;
    this.setState({ time });
  };

  handleUpdateMovie = async () => {
    const { id, name, rating, time } = this.state;
    const arrayTime = time.split('/');
    const payload = { name, rating, time: arrayTime };
    await api.updateMovieById(id, payload).then(res => {
      window.alert('Movie Sucessfully Updated!!');
      this.state = {
        name: '',
        rating: '',
        time: ''
      };
    });
  };
  componentDidMount = async () => {
    const { id } = this.state;
    const movie = await api.getMovieById(id);
    this.setState({
      name: movie.data.data.name,
      rating: movie.data.data.rating,
      time: movie.data.data.time.join('/')
    });
  };

  render() {
    const { name, rating, time } = this.state;

    return (
      <Wrapper>
        <Title> Update Movie</Title>
        <Label> Name:</Label>
        <InputText
          type='text'
          value={name}
          onChange={this.handleChangeInputName}
        />
        <Label> Rating:</Label>
        <InputText
          type='number'
          step='0.1'
          lang='en-US'
          min='0'
          max='10'
          pattern='[0-9]+([,\.][0-9]+)?'
          value={rating}
          onChange={this.handleChangeInpuRating}
        />
        <Label>Time:</Label>
        <InputText
          type='text'
          value={time}
          onChange={this.handleChangeInputTime}
        />
        <AddButton onClick={this.handleUpdateMovie}> Update Movie</AddButton>
        <CancelButton href={'/movies/list'}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default MoviesUpdate;
