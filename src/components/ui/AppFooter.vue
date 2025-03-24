<template>
  <footer>
    <div class="container">
      <p>&copy; {{ currentYear }} Système de Gestion de Demandes Administratives</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
footer {
  background-color: var(--primary);
  color: white;
  padding: 2rem 0;
  text-align: center;
  margin-top: 3rem;
}
</style>