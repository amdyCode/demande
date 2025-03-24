<template>
  <main>
    <hero-section @create-request="navigateToNewRequest"></hero-section>
    <features-section></features-section>
  </main>
</template>

<script>
import HeroSection from '../components/ui/HeroSection.vue'
import FeaturesSection from '../components/ui/FeaturesSection.vue'

export default {
  name: 'Home',
  components: {
    HeroSection,
    FeaturesSection
  },
  methods: {
    navigateToNewRequest() {
      this.$router.push('/nouvelle-demande')
    }
  }
}
</script>