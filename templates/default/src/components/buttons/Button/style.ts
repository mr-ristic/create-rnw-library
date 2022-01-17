import styled from 'rn-css';
import { ButtonProps } from './types';

export const ButtonContainer = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  padding: 12px 32px;
  border-radius: 4px;
  background-color: black;
  box-shadow: 10px 5px 5px red;

  ${({ disabled }) =>
    disabled && `background-color: gray; cursor: not-allowed;`}

  ${({ disabled }) =>
    !disabled &&
    `&:hover {
      background-color: #303030;
    }`}
`;
export const ButtonText = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
`;
