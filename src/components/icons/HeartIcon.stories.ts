import HeartIcon from './HeartIcon.vue';
import type { Meta, StoryObj } from '@storybook/vue3';

const meta: Meta<typeof HeartIcon> = {
  title: 'Components/HeartIcon',
  component: HeartIcon,
};

export default meta;
type Story = StoryObj<typeof HeartIcon>;

export const Default: Story = {
  render: () => ({
    components: { HeartIcon },
    template: `<div style="color: gray;"><HeartIcon /></div>`,
  }),
};

export const Liked: Story = {
  render: () => ({
    components: { HeartIcon },
    template: `<div style="color: red;"><HeartIcon /></div>`,
  }),
};
