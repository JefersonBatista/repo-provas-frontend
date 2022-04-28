import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 15px;

  max-width: 500px;
  width: 100vw;
  height: 100%;
  padding: 0 10px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

export default Form;
