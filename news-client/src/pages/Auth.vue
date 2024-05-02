<script lang="ts">
import { defineComponent, ref } from 'vue';
import '../styles/style.css';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const emailInput = ref<HTMLInputElement | null>(null);
    const passwordInput = ref<HTMLInputElement | null>(null);
    const router = useRouter();
    const handleSubmit = async () => {
  const email = emailInput.value?.value || '';
  const password = passwordInput.value?.value || '';

  try {
    
    const response = await axios.post(`http://localhost:5050/api/login`, { email: email, password: password });

    console.log('Ответ сервера:', response);
    const { accessToken, refreshToken, user } = response.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('role',user.role );
    router.push('/news');
    
  } catch (error) {
    alert(error)
    console.error('Ошибка при отправке запроса:', error);
    
  }
};
    
    return {
      emailInput,
      passwordInput,
      handleSubmit
    };
  }
});
</script>

<template>
  <div class="wrapper">
    <div class="header">
      <h3 class="sign-in">Авторизация</h3>
    </div>
    <div class="clear"></div>
    <form @submit.prevent="handleSubmit">
      <div>
        <label class="user" for="email">
          <svg viewBox="0 0 32 32">
            <g filter="">
              <use xlink:href="#man-people-user"></use>
            </g>
          </svg>
        </label>
        <input class="input user-input" type="email" ref="emailInput" id="email" placeholder="example@example.ru" />
      </div>
      <div>
        <label class="lock" for="password">
          <svg viewBox="0 0 32 32">
            <g filter="">
              <use xlink:href="#lock-locker"></use>
            </g>
          </svg>
        </label>
        <input type="password" class="input" ref="passwordInput" id="password" placeholder="******" />
      </div>
      <div>
        <input type="submit" class="input" value="Войти" />
      </div>
     
    </form>
  </div>
</template>

