import styled from 'styled-components';

export const UserName = styled.div`
  height: 3rem;
  width: 100%;

  max-width: 50vw;

  overflow: hidden;
  color: ${({ theme }) => theme.color.textPrime};
  font-size: 1rem;
  font-weight: bold;
  line-height: 3rem;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
