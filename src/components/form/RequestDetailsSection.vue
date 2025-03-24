<template>
    <div class="form-section">
      <h3 class="form-section-title">Détails de la demande</h3>
      
      <div class="form-group">
        <label for="description">Description détaillée</label>
        <textarea 
          id="description" 
          required 
          placeholder="Veuillez décrire votre demande en détail..."
          :value="description"
          @input="$emit('update:description', $event.target.value)"
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="startDate">Date de début (si applicable)</label>
        <input 
          type="date" 
          id="startDate"
          :value="startDate"
          @input="$emit('update:start-date', $event.target.value)"
        >
      </div>
      
      <div class="form-group">
        <label for="endDate">Date de fin (si applicable)</label>
        <input 
          type="date" 
          id="endDate"
          :value="endDate"
          @input="$emit('update:end-date', $event.target.value)"
        >
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RequestDetailsSection',
    props: {
      description: {
        type: String,
        default: ''
      },
      startDate: {
        type: String,
        default: ''
      },
      endDate: {
        type: String,
        default: ''
      }
    },
    emits: ['update:description', 'update:start-date', 'update:end-date']
  }
  </script>
  
  <style scoped>
  .form-section {
    border-bottom: 1px solid #eee;
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .form-section-title {
    margin-bottom: 1rem;
    color: var(--secondary);
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--dark);
  }
  
  input, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  </style>