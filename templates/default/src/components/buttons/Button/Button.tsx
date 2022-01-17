import React from 'react';
import { StyleSheet } from 'react-native';
import { ButtonContainer, ButtonText } from './style';
import { ButtonProps } from './types';

const Button = ({ disabled, label = '', onClick = () => {} }: ButtonProps) => {
  return (
    <ButtonContainer disabled={disabled} onPress={onClick}>
      <ButtonText>{label}</ButtonText>
    </ButtonContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200
  },
  indicator: {
    position: 'absolute',
    top: 8,
    right: 8
  }
});

export default Button;
