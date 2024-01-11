<script setup>
import defaultLayout from '@/views/defaultLayout.vue'
import SignInForm from '@/components/sign-in/index.vue'
import spinnerItem from '@/components/spinner/index.vue'
import axios from 'axios'
</script>

<template>
    <defaultLayout authorizationInfo="Sing Up">
        <spinnerItem v-if="!isLoaded" class="spinner"></spinnerItem>
        <SignInForm v-if="isLoaded" v-bind:isRegister="false" @form-submit="login"></SignInForm>
    </defaultLayout>
</template>

<script>
export default {
    name: 'login-page',
    methods: {
        async login(data) {
            try {
                this.isLoaded = false

                const password = data.password
                const email = data.email

                const code = await axios.post(import.meta.env.VITE_SERVER_URL + '/auth/login', {
                    password,
                    email
                })

                if (code.status === 200) {
                    const token = code.data.token
                    const name = code.data.name
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', name)

                    this.$router.push('/')
                    return
                }

                console.log(code)
                alert(code.data)
            } catch (err) {
                console.log(err)
                if (err.response.status === 401) {
                    alert(err.response.data.message)
                    return
                }
                alert(err)
            } finally {
                this.isLoaded = true
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
