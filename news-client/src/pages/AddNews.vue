<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import '../styles/news-details.css'

const selectedStatus = ref('');

const title = ref('')
const description = ref('')
const img = ref('')
const category = ref('')

const addNew = async () => {
    try {
        const response = await axios.post(`http://localhost:5050/api/createNews`, { img: img.value, title: title.value, description: description.value, status: selectedStatus.value, categoryName: category.value });
    }
    catch (error) {
        alert(error)
        console.error('Ошибка при сохранении новостей:', error);
    }
}
</script>

<template>
    <div class="container">
        <div class="news-add">
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
                    <button type="submit" class="btn btn-add" @click="addNew">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>
