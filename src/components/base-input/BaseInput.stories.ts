import BaseInput from "./BaseInput.vue";
import type { Meta, StoryObj } from "@storybook/vue3";

const meta: Meta<typeof BaseInput> = {
  title: "Components/BaseInput",
  component: BaseInput,
  argTypes: {
    modelValue: { control: "text" },
    placeholder: { control: "text" },
    type: { control: "text" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof BaseInput>;

export const Default: Story = {
  args: {
    modelValue: "",
    placeholder: "Введите текст",
  },
};

export const Filled: Story = {
  args: {
    modelValue: "Пример текста",
    placeholder: "Введите текст",
  },
};

export const WithError: Story = {
  args: {
    modelValue: "",
    placeholder: "Введите текст",
    error: "Ошибка: поле обязательно",
  },
};
