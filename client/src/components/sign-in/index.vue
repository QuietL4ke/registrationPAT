<template>
    <form @submit.prevent="submitForm" method="post">
        <div v-if="isRegister">
            <label for="username">Username:</label>
            <input v-model="username" type="text" id="username" name="username" required />
        </div>

        <label for="email">Email:</label>
        <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            required
        />

        <label for="password">Password:</label>
        <input
            v-model="password"
            type="password"
            id="password"
            name="password"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            required
        />

        <button type="submit">{{buttonText}}</button>
    </form>
</template>

<!-- pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" -->

<script>
export default {
    name: 'signIn-form',
    methods: {
        submitForm() {
            this.$emit('form-submit', {
                email: this.email,
                password: this.password,
                username: this.username
            })
        }
    },
    props: {
        isRegister: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        buttonText() {
            return this.isRegister ? 'Register' : 'Sign in'
        }
    },
    data() {
        return {
            email: "",
            password: "",
            username: "",
        }
    }
}
</script>

<style scoped>
form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
}

label {
    display: block;
    margin-bottom: 8px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
}

button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

button:hover {
    background-color: #45a049;
}
</style>
