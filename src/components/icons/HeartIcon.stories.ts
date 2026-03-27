import BaseHeartIcon from './HeartIcon.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof BaseHeartIcon> = {
  title: 'Components/BaseHeartIcon',
  component: BaseHeartIcon,
  argTypes: {
    isLiked: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof BaseHeartIcon>;

export const Default: Story = {
  args: {
    isLiked: false,
  },
};

export const Liked: Story = {
  args: {
    isLiked: true,
  },
};
