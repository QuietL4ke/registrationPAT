<script setup>
import defaultLayout from '@/views/defaultLayout.vue'
import spinnerItem from '@/components/spinner/index.vue'
import axios from 'axios'
</script>

<template>
    <defaultLayout :authorizationInfo=loginInfo >
        <spinnerItem v-if="!isLoaded" class="spinner"></spinnerItem>
        <h1 v-if="isLoaded">{{ info }}</h1>
    </defaultLayout>
</template>

<script>
export default {
    name: 'main-page',
    data() {
        return {
            isLoaded: false,
            info: '',
            loginInfo: 'Sign In'
        }
    },
    computed: {
        currentUrl() {
            return import.meta.env.VITE_SERVER_URL + import.meta.env.BASE_URL
        }
    },
    methods: {
        async getUserInfo() {
            this.isLoaded = false
            const token = localStorage.getItem('token')
            let header = null
            if (token) header = { headers: { authorization: `Bearer ${token}` } }

            return new Promise((resolve, reject) => {
                axios.get(this.currentUrl, header).then(
                    (res) => {
                        resolve(res.data)
                    },
                    (err) => {
                        reject(err)
                    }
                )
            })
        }
    },
    async mounted() {
        try {
            const data = await this.getUserInfo()
            const tempObj = {
                id: data._id,
                username: data.name
            }

            for (const key in tempObj) {
                this.info = this.info + key + ' : ' + tempObj[key] + '\n';
            }

            this.loginInfo = 'Log out';
        } catch (err) {
            if (err.response.status === 401) {
                this.info = err.response.data
            } else {
                alert(err)
            }
        } finally {
            this.isLoaded = true
        }
    }
}
</script>

<style scoped>
h1 {
    max-width: 500px;
    text-align: center;
}</style>
