// @ts-nocheck
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Button from './Button';

export default {
  title: 'components/Button',
  component: Button,
  label: '',
  argTypes: {
    onClick: { action: 'clicked' }
  }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'HELLO WORLD',
  disabled: false
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'HELLO WORLD',
  disabled: true
};
