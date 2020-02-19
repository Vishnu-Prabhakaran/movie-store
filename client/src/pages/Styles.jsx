import styled from 'styled-components';

export const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

export const Update = styled.div`
  color: #ef9b0f;
  cursor: 'pointer';
`;

export const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

export const Title = styled.h1.attrs({
  className: 'h1'
})``;

export const Wrapper = styled.div.attrs({
  className: 'form-group'
})`
  margin: 0 30px;
`;

export const Label = styled.label`
  margin: 5px;
`;
export const InputText = styled.input.attrs({
  className: 'form-control'
})`
  margin: 5px;
`;
export const AddButton = styled.button.attrs({
  className: 'btn btn-primary'
})`
  margin: 15px 15px 15px 5px;
`;

export const CancelButton = styled.a.attrs({
  className: 'btn btn-danger'
})`
  margin: 15px 15px 15px 5px;
`;
