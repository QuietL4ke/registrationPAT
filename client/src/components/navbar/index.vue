<template>
    <header>
        <nav class="body__nav nav">
            <a class="nav__logo-holder logo-holder">
                <img
                    v-on:click="navigateToHome"
                    src="/src/assets/logo.svg"
                    class="nav__logo logo"
                    alt="logo"
                />
                <h2 class="nav__site-name">{{ siteName }}</h2>
            </a>
            <div class="navbar__profile-holder">
                <div v-if="inAccount" class="navbar__profile">
                    {{ username }}
                </div>
                <a class="navbar__authorization" @click="changeProfile">
                    {{  authorizationInfo }}
                </a>
            </div>
        </nav>
    </header>
</template>
<script>
export default {
    name: 'navbar-item',
    data() {
        return {
            siteName: 'Registration Test',
            username: '',
            inAccount: false
        }
    },
    methods: {
        navigateToHome() {
            this.$router.push('/')
        },
        changeProfile() {
            if (this.inAccount) {
                this.logout()
                this.$router.push('login')
                return
            }

            switch (this.currentRouteName) {
                case 'login':
                    this.$router.push('register')
                    break
                default:
                    this.$router.push('login')
            }
        },
        logout() {
            localStorage.clear()
        },
        isLogin() {
            return localStorage.getItem('username')
        }
    },
    computed: {
        currentRouteName() {
            return this.$route.name
        }
    },
    mounted() {
        if (!this.isLogin()) {
            this.inAccount = false
        } else {
            this.inAccount = true
            this.username = localStorage.getItem('username')
        }
    },
    props: {
        authorizationInfo: {
            type: String,
            default: 'Sign In'
        }
    }
}
</script>

<style scoped>
.body__nav {
    margin-bottom: 1rem;
}

.nav {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: rgba(105, 105, 105, 0.315);
}

.link {
    text-decoration: none;
    color: chocolate;
    font-family: fantasy;
    border: 1px solid blanchedalmond;
    border-radius: 20%;
    padding: 2rem;
    background-color: navajowhite;
}

.nav__logo-holder {
    margin-left: 2rem;
    display: flex;
    align-items: center;
}

.logo {
    max-height: 4rem;
    cursor: pointer;
}

.logo-holder {
    display: flex;
}

.nav__site-name {
    margin-left: 3rem;
    font-size: 1.5rem;
    white-space: nowrap;
}

.navbar__profile-holder {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    margin-right: 3rem;
    align-items: center;
}

.navbar__profile {
    font-size: 20px;
    font-style: italic;
}

.navbar__authorization {
    cursor: pointer;
}
</style>
