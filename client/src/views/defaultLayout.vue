<template>
    <div>
        <navbar :authorizationInfo="authorizationInfo"></navbar>
        <div class="form-container">
            <slot />
        </div>
        <v-footer :isBottom="isBottom" />
    </div>
</template>
<script>
import Navbar from '@/components/navbar/index.vue'
import VFooter from '@/components/footer/index.vue'

export default {
    props: {
        isBottom: {
            type: Boolean,
            default: false
        },

        authorizationInfo: {
            type: String,
            default: 'Sign in'
        }
    },

    components: {
        Navbar,
        VFooter
    }
}
</script>
<style scope>
.form-container {
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
</style>
