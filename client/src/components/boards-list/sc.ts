import styled from 'styled-components';

interface SCProps {
  isDefaultCard: boolean;
}

const CardContainer = styled.div`
  display: flex;
  height: 90%;
  align-items: start;
  flex-wrap: wrap;
`;

const Card = styled.div<SCProps>`
  display: ${(props) => (!props.isDefaultCard ? 'block' : 'flex')};
  color: ${(props) => (!props.isDefaultCard ? '#fff' : '')};
  align-items: center;
  overflow: hidden;
  justify-content: center;
  margin-right: 15px;
  margin-bottom: 12px;
  width: 200px;
  height: 100px;
  background-color: ${(props) => (!props.isDefaultCard ? '#0079bf' : '#f1f5ed')};
  border-radius: 5px;
  padding: 8px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    box-shadow: inset 0px 2px 50px 10px rgba(0, 0, 0, 0.23);
  }
`;

export { CardContainer, Card };
