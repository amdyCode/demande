<template>
    <section class="form-container">
      <form @submit.prevent="submitForm">
        <general-info-section 
          v-model:request-type="formData.requestType"
          v-model:request-title="formData.requestTitle"
          v-model:priority="formData.priority"
        />
        
        <request-details-section 
          v-model:description="formData.description"
          v-model:start-date="formData.startDate"
          v-model:end-date="formData.endDate"
        />
        
        <documents-section 
          v-model:files="formData.files"
          v-model:additional-info="formData.additionalInfo"
        />
        
        <div class="form-actions">
          <button type="button" class="btn" @click="saveDraft">Enregistrer comme brouillon</button>
          <button type="submit" class="btn btn-success">Soumettre la demande</button>
        </div>
      </form>
    </section>
  </template>
  
  <script>
  import GeneralInfoSection from './form-sections/GeneralInfoSection.vue'
  import RequestDetailsSection from './form-sections/RequestDetailsSection.vue'
  import DocumentsSection from './form-sections/DocumentsSection.vue'
  
  export default {
    name: 'RequestForm',
    components: {
      GeneralInfoSection,
      RequestDetailsSection,
      DocumentsSection
    },
    data() {
      return {
        formData: {
          requestType: '',
          requestTitle: '',
          priority: 'medium',
          description: '',
          startDate: '',
          endDate: '',
          files: [],
          additionalInfo: ''
        }
      }
    },
    methods: {
      submitForm() {
        console.log('Formulaire soumis:', this.formData)
        // Implémenter la logique d'envoi du formulaire
        alert('Votre demande a été soumise avec succès!')
        this.resetForm()
      },
      saveDraft() {
        console.log('Brouillon enregistré:', this.formData)
        // Implémenter la logique d'enregistrement du brouillon
        alert('Votre brouillon a été enregistré')
      },
      resetForm() {
        this.formData = {
          requestType: '',
          requestTitle: '',
          priority: 'medium',
          description: '',
          startDate: '',
          endDate: '',
          files: [],
          additionalInfo: ''
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .form-container {
    background-color: white;
    border-radius: 10px;
    padding: 2rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
  }
  
  .form-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  
  @media (max-width: 768px) {
    .form-actions {
      flex-direction: column;
      gap: 1rem;
    }
  }
  </style>