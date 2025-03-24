<template>
  <section class="container">
    <div class="features">
      <feature-card 
        v-for="(feature, index) in features" 
        :key="index" 
        :icon="feature.icon" 
        :title="feature.title" 
        :description="feature.description">
      </feature-card>
    </div>
  </section>
</template>

<script>
import FeatureCard from './FeatureCard.vue'

export default {
  name: 'FeaturesSection',
  components: {
    FeatureCard
  },
  data() {
    return {
      features: [
        {
          icon: '📝',
          title: 'Soumission simple',
          description: 'Remplissez votre demande en quelques étapes avec notre formulaire intuitif'
        },
        {
          icon: '🔍',
          title: 'Suivi en temps réel',
          description: 'Suivez l\'état de vos demandes à tout moment'
        },
        {
          icon: '📄',
          title: 'Gestion des documents',
          description: 'Téléchargez et gérez tous vos documents nécessaires'
        }
      ]
    }
  }
}
</script>

<style scoped>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 3rem 0;
}
</style>