<script setup>
import defaultLayout from '@/views/defaultLayout.vue'
import SignInForm from '@/components/sign-in/index.vue'
import spinnerItem from '@/components/spinner/index.vue'
import axios from 'axios'
</script>

<template>
    <defaultLayout authorizationInfo="Sign In">
        <spinnerItem v-if="!isLoaded" class="spinner"></spinnerItem>
        <SignInForm v-if="isLoaded" v-bind:isRegister="true" @form-submit="register"></SignInForm>
    </defaultLayout>
</template>

<script>
export default {
    name: 'register-page',
    methods: {
        async register(data) {
            try {
                this.isLoaded = false

                const password = data.password
                const email = data.email
                const username = data.username

                const code = await axios.post(import.meta.env.VITE_SERVER_URL + '/auth/register', {
                    password,
                    email,
                    username
                });

                alert(code.data);

                if (code.status === 200) {
                    this.$router.push('login');
                }
            } catch (err) {
                alert(err)
            } finally {
                this.isLoaded = true;
            }
        }
    },
    data() {
        return {
            isLoaded: true
        }
    }
}
</script>

<style scoped></style>
