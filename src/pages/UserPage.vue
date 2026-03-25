<template>
  <div class="user-page">
    <div class="user-header">
      <div class="user-header-info">
        <h1 class="user-header-title">
          Привет, {{ authStore.userData?.username }} !
        </h1>
        <p class="user-header-description">
          Конокритик 2 уровня.
          <span class="highlight">До 3 уровня осталось 150 баллов</span>
        </p>
      </div>
      <BaseButton @click="logoutUser">Выйти</BaseButton>
    </div>

    <div class="user-tabs">
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'watch-list' }"
        @click="activeTab = 'watch-list'"
      >
        Смотреть позже
      </button>
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'favorites' }"
        @click="activeTab = 'favorites'"
      >
        Избранное
      </button>
      <button
        class="user-tabs-btn"
        :class="{ active: activeTab === 'settings' }"
        @click="activeTab = 'settings'"
      >
        Настройки аккаунта
      </button>
    </div>

    <div class="user-tab-content">
      <div v-if="activeTab === 'watch-list' || activeTab === 'favorites'">
        <div class="movies__cards">
          <MediaCard
            v-for="item in userMediaStore.userMedia"
            :key="item.id"
            :id="item.id"
            :title="item.title"
            :image="item.image"
            :rating="item.rating"
            :media="item.media"
            :genres="item.genres"
            :link="item.link"
          />
        </div>
      </div>

      <div v-else>
        <div class="user-profile-section">
          <div class="user-layout">
            <div class="user-layout__left">
              <img :src="avatarUrl" alt="Аватар" class="user-avatar__img" />
            </div>

            <div class="user-layout__right">
              <div class="user-block">
                <h2 class="user-block__title">Личные данные</h2>

                <form class="user-form" @submit.prevent="handleProfileSave">
<<<<<<< HEAD
                  <BaseInput :field="firstNameField" placeholder="Имя" />
                  <BaseInput :field="lastNameField" placeholder="Фамилия" />
                  <BaseInput
                    :field="emailField"
=======
                  <BaseInput
                    v-model="firstName"
                    :error="firstNameField.errorMessage.value"
                    placeholder="Имя"
                  />
                  <BaseInput
                    v-model="lastName"
                    :error="lastNameField.errorMessage.value"
                    placeholder="Фамилия"
                  />
                  <BaseInput
                    v-model="email"
                    :error="emailField.errorMessage.value"
>>>>>>> feature/auth
                    placeholder="Email"
                    type="email"
                  />

                  <BaseButton type="submit" variant="ghost" class="form-btn">
                    Сохранить изменения
                  </BaseButton>
                </form>
              </div>

              <div class="user-block">
                <h2 class="user-block__title">Изменение пароля</h2>

                <form class="user-form" @submit.prevent="handlePasswordChange">
                  <BaseInput
<<<<<<< HEAD
                    :field="currentPasswordField"
                    placeholder="Текущий пароль"
                    type="password"
                  />
                  <BaseInput
                    :field="newPasswordField"
                    placeholder="Новый пароль"
                    type="password"
                  />
                  <BaseInput
                    :field="confirmPasswordField"
                    placeholder="Повторите пароль"
                    type="password"
=======
                    v-model="currentPassword"
                    :error="currentPasswordField.errorMessage.value"
                    type="password"
                    placeholder="Текущий пароль"
                  />
                  <BaseInput
                    v-model="newPassword"
                    :error="newPasswordField.errorMessage.value"
                    type="password"
                    placeholder="Новый пароль"
                  />
                  <BaseInput
                    v-model="confirmPassword"
                    :error="confirmPasswordField.errorMessage.value"
                    type="password"
                    placeholder="Повторите пароль"
>>>>>>> feature/auth
                  />

                  <BaseButton type="submit" variant="ghost" class="form-btn">
                    Сохранить изменения
                  </BaseButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/store/auth/auth';
  import { useUserMediaStore } from '@/store/user-media/user-media';
  import BaseButton from '@/components/base-button/BaseButton.vue';
  import MediaCard from '@/components/media-card/MediaCard.vue';
  import BaseInput from '@/components/base-input/BaseInput.vue';
  import { ROUTES } from '@/router/paths';
<<<<<<< HEAD
=======
  import { STORAGE_KEYS } from '@/constants/storage-keys';
>>>>>>> feature/auth

  import { useForm, useField } from 'vee-validate';
  import { toTypedSchema } from '@vee-validate/zod';
  import { z } from 'zod';

  const authStore = useAuthStore();
  const userMediaStore = useUserMediaStore();
  const router = useRouter();

  type Tabs = 'watch-list' | 'favorites' | 'settings';
  const activeTab = ref<Tabs>('watch-list');
  const tabs: Tabs[] = ['watch-list', 'favorites', 'settings'];

  const logoutUser = () => {
    authStore.logoutUser();
    router.push({ name: ROUTES.home.name });
  };

  watch(activeTab, (tab) => {
<<<<<<< HEAD
    localStorage.setItem('user_active_tab', tab);
=======
    localStorage.setItem(STORAGE_KEYS.USER_ACTIVE_TAB, tab);
>>>>>>> feature/auth

    if (tab === 'watch-list') {
      userMediaStore.loadUserMedia(authStore.userData?.watchList ?? []);
    } else if (tab === 'favorites') {
      userMediaStore.loadUserMedia(authStore.userData?.favorites ?? []);
    }
  });

  onMounted(() => {
<<<<<<< HEAD
    const savedTab = localStorage.getItem('user_active_tab');
=======
    const savedTab = localStorage.getItem(STORAGE_KEYS.USER_ACTIVE_TAB);
>>>>>>> feature/auth

    if (tabs.includes(savedTab as Tabs)) {
      activeTab.value = savedTab as Tabs;
    }

    if (activeTab.value === 'watch-list') {
      userMediaStore.loadUserMedia(authStore.userData?.watchList ?? []);
    }
  });

  const avatarUrl = computed(
    () => `https://i.pravatar.cc/150?u=${authStore.userData?.id}`
  );

  const schemaProfile = z.object({
    firstName: z.string().min(2, 'Минимум 2 символа'),
    lastName: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Неверный email'),
  });

  const { handleSubmit: handleProfileSubmit } = useForm({
    validationSchema: toTypedSchema(schemaProfile),
    initialValues: {
      firstName: authStore.userData?.firstName || '',
      lastName: authStore.userData?.lastName || '',
      email: authStore.userData?.email || '',
    },
  });

  const firstNameField = useField<string>('firstName');
  const lastNameField = useField<string>('lastName');
  const emailField = useField<string>('email');

<<<<<<< HEAD
=======
  const firstName = computed({
    get: () => firstNameField.value.value,
    set: (val: string) => firstNameField.setValue(val),
  });

  const lastName = computed({
    get: () => lastNameField.value.value,
    set: (val: string) => lastNameField.setValue(val),
  });

  const email = computed({
    get: () => emailField.value.value,
    set: (val: string) => emailField.setValue(val),
  });

>>>>>>> feature/auth
  const handleProfileSave = handleProfileSubmit((values) => {
    authStore.updateProfile(values);
  });

  const schemaPassword = z
    .object({
      currentPassword: z.string().min(4, 'Минимум 4 символа'),
      newPassword: z.string().min(4, 'Минимум 4 символа'),
      confirmPassword: z.string().min(4, 'Минимум 4 символа'),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: 'Пароли не совпадают',
      path: ['confirmPassword'],
    });

  const { handleSubmit: handlePasswordSubmit, resetForm } = useForm({
    validationSchema: toTypedSchema(schemaPassword),
  });

  const currentPasswordField = useField<string>('currentPassword');
  const newPasswordField = useField<string>('newPassword');
  const confirmPasswordField = useField<string>('confirmPassword');

<<<<<<< HEAD
=======
  const currentPassword = computed({
    get: () => currentPasswordField.value.value,
    set: (val: string) => currentPasswordField.setValue(val),
  });

  const newPassword = computed({
    get: () => newPasswordField.value.value,
    set: (val: string) => newPasswordField.setValue(val),
  });

  const confirmPassword = computed({
    get: () => confirmPasswordField.value.value,
    set: (val: string) => confirmPasswordField.setValue(val),
  });

>>>>>>> feature/auth
  const handlePasswordChange = handlePasswordSubmit((values) => {
    const success = authStore.changePassword(
      values.currentPassword,
      values.newPassword
    );

    if (success) {
      resetForm();
    }
  });
</script>

<style scoped>
  .user-page {
    margin: 0 auto;
  }

  .user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    margin-bottom: 20px;
    border-top: 1px solid var(--color-text-secondary);
    border-bottom: 1px solid var(--color-text-secondary);
  }

  .user-header-info {
    margin: 30px 0;
  }

  .user-header-title {
    margin-bottom: 8px;
  }

  .highlight {
    color: var(--color-text-secondary);
  }

  .user-tabs {
    display: flex;
    gap: 20px;
    border-bottom: 1px solid var(--color-text-secondary);
  }

  .user-tab-content {
    padding: 40px 0;
  }

  .user-tabs-btn {
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--color-text-primary);
    cursor: pointer;
    font-size: 15px;
    margin-bottom: 20px;
  }

  .user-tabs-btn.active {
    color: var(--color-btn-primary);
  }

  .movies__cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
  }

  .user-profile-section {
    padding-top: 40px;
  }

  .user-layout {
    display: flex;
    gap: 30px;
    align-items: flex-start;
  }

  .user-layout__left {
    width: 150px;
    flex-shrink: 0;
  }

  .user-layout__right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .user-block {
    border-bottom: 1px solid var(--color-text-secondary);
    padding-bottom: 40px;
  }

  .user-block:last-child {
    border-bottom: none;
  }

  .user-block__title {
    margin-bottom: 30px;
  }

  .user-form {
    display: flex;
    flex-direction: column;
    gap: 20px;

    max-width: 300px;
    width: 100%;
  }

  .form-btn {
    align-self: flex-start;
  }
</style>
