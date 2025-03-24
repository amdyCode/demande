<template>
    <main class="container">
      <section class="page-title">
        <h1>Soumettre une nouvelle demande</h1>
      </section>
      
      <request-form />
    </main>
  </template>
  
  <script>
  import RequestForm from '@/components/RequestForm.vue'
  
  export default {
    name: 'NewDemande',
    components: {
      RequestForm
    }
  }
  </script>
  
  <style scoped>
  .page-title {
    padding: 2rem 0;
    text-align: center;
  }
  
  .page-title h1 {
    font-size: 2rem;
    color: var(--primary);
  }
  </style>