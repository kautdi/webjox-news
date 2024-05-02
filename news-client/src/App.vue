<script setup lang="ts">
import {onMounted} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onMounted(async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');
    const role = localStorage.getItem('role');
    if (!refreshToken || !accessToken || !role) {
        router.push('/auth');
    } else {
        router.push('/news');
    }
});
</script>

<template>
  <RouterView/>
</template>