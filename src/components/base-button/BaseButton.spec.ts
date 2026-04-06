import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseButton from "./BaseButton.vue";

describe("BaseButton", () => {
  it("рендерится с текстом из слота", () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: "Click me",
      },
    });

    expect(wrapper.text()).toBe("Click me");
  });

  it('имеет класс по умолчанию "base-btn--primary"', () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.classes()).toContain("base-btn--primary");
  });

  it("меняет класс в зависимости от variant", () => {
    const wrapper = mount(BaseButton, {
      props: { variant: "ghost" },
    });
    expect(wrapper.classes()).toContain("base-btn--ghost");
  });
});
