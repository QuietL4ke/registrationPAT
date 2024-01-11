<script setup>
import defaultLayout from '@/views/defaultLayout.vue'
</script>

<template>
    <defaultLayout authorizationInfo="Sing In">
        <div class="error__page">
            <h1>Page not Found 404</h1>
        </div>
    </defaultLayout>
</template>

<script>
export default {
    name: 'error-page'
}
</script>


<style scoped>
.error__page {
    color: brown;
    
}
</style>
