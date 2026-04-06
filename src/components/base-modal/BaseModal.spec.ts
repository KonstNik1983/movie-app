import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import BaseModal from "@/components/base-modal/BaseModal.vue";

describe("BaseModal.vue", () => {
  it("рендерится только когда isShow = true", async () => {
    const wrapper = mount(BaseModal, { props: { isShow: false } });
    expect(wrapper.find(".base-modal").exists()).toBe(false);

    await wrapper.setProps({ isShow: true });
    expect(wrapper.find(".base-modal").exists()).toBe(true);
  });

  it("вызывает emit close при клике на overlay", async () => {
    const wrapper = mount(BaseModal, { props: { isShow: true } });
    await wrapper.find(".base-modal__overlay").trigger("click");
    expect(wrapper.emitted("close")).toBeTruthy();
    expect(wrapper.emitted("close")?.length).toBe(1);
  });

  it("рендерит слот внутри модалки", () => {
    const wrapper = mount(BaseModal, {
      props: { isShow: true },
      slots: { default: '<p class="slot-content">Hello</p>' },
    });
    expect(wrapper.find(".slot-content").text()).toBe("Hello");
  });
});
