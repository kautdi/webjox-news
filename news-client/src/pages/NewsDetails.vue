<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import '../styles/news-details.css'

const router = useRouter();
const item = ref({});
const selectedStatus = ref('');
const userRole = localStorage.getItem('role');
const title = ref('')
const description = ref('')
const img = ref('')
const category = ref('')

const getNew = async () => {
    try {
        const response = await axios.post(`http://localhost:5050/api/getOneNew`, { _id: router.currentRoute.value.params.id });
        console.log(response.data);
        item.value = response.data;
        selectedStatus.value = String(response.data[0].status);
        title.value = response.data[0].title;
        description.value = response.data[0].description;
        img.value = response.data[0].img;
        category.value = response.data[0].category.name;
    } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
    }
};

onMounted(async () => {
    await getNew();
});

const updateNew = async () => {
    try {
        const response = await axios.post(`http://localhost:5050/api/updateNews`, { _id: router.currentRoute.value.params.id, img: img.value, title: title.value, description: description.value, status: selectedStatus.value, categoryName: category.value });
    }
    catch (error) {
        console.error('Ошибка при сохранении новостей:', error);
    }
}
const deleteNew = async () => {
    try {
        const response = await axios.post(`http://localhost:5050/api/deleteNews`, { _id: router.currentRoute.value.params.id });
    }
    catch (error) {
        console.error('Ошибка при сохранении новостей:', error);
    }
}
</script>

<template>
    <div class="container">
        <div class="news-edit" v-for="item in item" :key="item._id">
            <div class="pic-block">
                <img :src="item.img"
                    alt="Картинка новости" srcset="" />
            </div>
            <div class="edit-block">
                <div class="input-block">
                    <label for="title" class="label">Заголовок</label>
                    <input type="text" class="input-edit" name="title" id="title" v-model="title" />
                </div>
                <div class="input-block">
                    <label for="description" class="label">Описание</label>
                    <textarea name="description" id="description" class="textarea-edit"
                        v-model="description"></textarea>
                </div>
                <div class="input-block">
                    <label for="image" class="label">Картинка</label>
                    <input type="text" name="image" class="input-edit" id="image" v-model="img" />
                </div>
                <div class="input-flexcont">
                    <div class="input-block">
                        <label for="category" class="label">Категория</label>
                        <input type="text" name="category" class="input-edit" id="category" v-model="category" />
                    </div>
                    <div class="input-block">
                        <label for="status" class="label">Статус</label>
                        <select name="status" class="selected-edit" v-model="selectedStatus">
                            <option value="">Выбрать статус</option>
                            <option value="true">Видимый</option>
                            <option value="false">Невидимый</option>
                        </select>
                    </div>
                </div>
                <div class="btn-block">
                    <button type="submit" class="btn btn-save" @click="updateNew">Сохранить</button>
                    <button type="submit" v-if="userRole !== 'manager'" class="btn btn-delete" @click="deleteNew">Удалить</button>
                </div>
            </div>
        </div>
    </div>
</template>
