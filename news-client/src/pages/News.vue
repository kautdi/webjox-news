<script>
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
import '../styles/news.css';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const itemsPerPage = ref(3); 
    const currentPage = ref(1); 
    const items = ref([]);
    const totalPages = computed(() => Math.ceil(items.value.length / itemsPerPage.value)); // Общее количество страниц
    const router = useRouter();
   
    const userRole = localStorage.getItem('role');

    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/news');
        items.value = response.data;
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    };

    onMounted(async () => {
      await fetchNews();
    });

   
    const options = computed(() => {
      const maxItemsPerPage = Math.min(items.value.length, 6);
      return Array.from({ length: maxItemsPerPage }, (_, index) => index + 1);
    });


    const displayedItems = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage.value;
      const endIndex = startIndex + itemsPerPage.value;
      return items.value.slice(startIndex, endIndex);
    });


    const goToPreviousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };


    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const logout = () => {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('role')
      router.push('/auth')
    };

    return {
      itemsPerPage,
      currentPage,
      displayedItems,
      totalPages,
      options,
      userRole,
      goToPreviousPage,
      goToNextPage,
      logout
    };
  }
};
</script>

<template>
    <div class="news-container">
      <div class="news-head">
        <h1 class="news-title">Новости</h1>
        <div class="input-block-edit">
          <label for="items" class="label">Кол-во новостей</label>
          <select name="items" class="kolvo-selected-edit news-selcted-edit" v-model="itemsPerPage">
            <option v-for="option in options" :value="option" :key="option">{{ option }}</option>
          </select>
          <router-link v-if="userRole !== 'manager'" :to="`/add-news`" class="btn-add">
            Добавить
          </router-link>
          <button class="btn btn-logout" @click="logout">Выход</button>
        </div>
      </div>
      <div class="news-block">
        <div class="news-items">
          <div class="news-item" v-for="item in displayedItems" :key="item._id">
            <router-link :to="'/newsdetails/' + item._id" class="news-link">
              <div class="pic-block">
                <img :src="item.img" alt="Картинка новости" srcset="" />
              </div>
              <h2 class="news-title">{{ item.title }}</h2>
              <p class="news-description">{{ item.description }}</p>
              <div class="news-category">
                <p class="category-text">{{ item.category.name }}</p>
              </div>
            </router-link>
          </div>
        </div>
        <div class="pagination">
          <button @click="goToPreviousPage" :disabled="currentPage === 1" class="btn-pagination">Предыдущая</button>
          <span class="num-pagination">{{ currentPage }} из {{ totalPages }}</span>
          <button @click="goToNextPage" :disabled="currentPage === totalPages" class="btn-pagination">Следующая</button>
        </div>
      </div>
    </div>
  </template>
  
 