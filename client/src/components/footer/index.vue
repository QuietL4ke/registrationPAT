<template>
    <footer class="footer footer__bottom">
        <span class="footer__text">Alexander Rusalski</span>
    </footer>
</template>
<script>
// import logo from '/icons/logo.png';
export default {
    name: 'footer-item'
}
</script>

<style scoped>
.footer {
    margin-top: auto;
    background-color: rgba(128, 128, 128, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    width: 100%;

    border-radius: 10px;
    margin-top: 2rem;
    flex-direction: column;
}

.footer__bottom {
    margin-top: 0;
    position: absolute;
    bottom: 0;
}

.footer__text {
    font-size: 0.7rem;
    opacity: 0.7;
    font-family: Arial, Helvetica, sans-serif;
}
</style>
