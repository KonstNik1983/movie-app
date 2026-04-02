import BaseButton from "./BaseButton.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof BaseButton> = {
  title: "Components/BaseButton",
  component: BaseButton,
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "ghost", "ghost-secondary"],
      description: "Вариант стилизации кнопки",
    },
    default: {
      control: "text",
      description: "Текст кнопки (slot)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    default: "Primary Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    default: "Ghost Button",
  },
};

export const GhostSecondary: Story = {
  args: {
    variant: "ghost-secondary",
    default: "Ghost Secondary Button",
  },
};
