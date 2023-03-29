import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
  background: ${(p) => (p.action === 'Adding' ? '#d4edda' : '#f8d7da')};
  border-radius: 8px;
  border: solid 1px ${(p) => (p.action === 'Adding' ? '#c3e6cb' : '#f5c6cb')};
`;

export const Content = styled.div`
  align-items: center;
  font-size: 13px;
  display: flex;

  span {
    margin: 1em;
  }

  img {
    height: 50px;
  }
`;
