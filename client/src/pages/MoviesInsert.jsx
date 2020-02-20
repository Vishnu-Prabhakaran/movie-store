import React, { useState } from 'react';
import api from '../api';

import {
  Title,
  Wrapper,
  Label,
  InputText,
  AddButton,
  CancelButton
} from './Styles';

const MoviesInsert = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState('');
  const [time, setTime] = useState('');

  const handleChangeInputName = async event => {
    const name = event.target.value;
    setName(name);
  };
  const handleChangeInpuRating = async event => {
    const rating = event.target.validity.valid
      ? event.target.value
      : this.state.rating;

    setRating(rating);
  };
  const handleChangeInputTime = async event => {
    const time = event.target.value;
    setTime(time);
  };

  const handleIncludeMovie = async () => {
    const arrayTime = time.split('/');
    const payload = { name, rating, time: arrayTime };
    await api.insertMovie(payload).then(res => {
      window.alert('Movie Sucessfully Inserted!!');
      setTime('');
      setName('');
      setRating('');
    });
  };

  return (
    <Wrapper>
      <Title> Create Movie</Title>
      <Label> Name:</Label>
      <InputText type='text' value={name} onChange={handleChangeInputName} />
      <Label> Rating:</Label>
      <InputText
        type='number'
        step='0.1'
        lang='en-US'
        min='0'
        max='10'
        pattern='[0-9]+([,\.][0-9]+)?'
        value={rating}
        onChange={handleChangeInpuRating}
      />
      <Label>Time:</Label>
      <InputText type='text' value={time} onChange={handleChangeInputTime} />
      <AddButton onClick={handleIncludeMovie}> Add Movie</AddButton>
      <CancelButton href={'/movies/list'}>Cancel</CancelButton>
    </Wrapper>
  );
};

export default MoviesInsert;
