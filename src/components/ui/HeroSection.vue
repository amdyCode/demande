<template>
  <section class="hero">
    <div class="container">
      <h1>Gestion de Demandes Administratives</h1>
      <p>Plateforme simple et efficace pour soumettre et traiter vos demandes administratives</p>
      <button @click="createRequest" class="btn">Créer une nouvelle demande</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  methods: {
    createRequest() {
      this.$emit('create-request')
    }
  }
}
</script>

<style scoped>
.hero {
  padding: 3rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: var(--dark);
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }
  
  .hero p {
    font-size: 1rem;
  }
}
</style>