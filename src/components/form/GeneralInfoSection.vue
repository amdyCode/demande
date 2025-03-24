<template>
    <div class="form-section">
      <h3 class="form-section-title">Informations générales</h3>
      
      <div class="form-group">
        <label for="requestType">Type de demande</label>
        <select 
          id="requestType" 
          required 
          :value="requestType"
          @input="$emit('update:request-type', $event.target.value)"
        >
          <option value="">Sélectionnez un type</option>
          <option value="administrative">Demande administrative</option>
          <option value="leave">Congé</option>
          <option value="equipment">Demande de matériel</option>
          <option value="other">Autre</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="requestTitle">Titre de la demande</label>
        <input 
          type="text" 
          id="requestTitle" 
          required 
          placeholder="Titre concis de votre demande"
          :value="requestTitle"
          @input="$emit('update:request-title', $event.target.value)"
        >
      </div>
      
      <div class="form-group">
        <label for="priority">Priorité</label>
        <select 
          id="priority" 
          required
          :value="priority"
          @input="$emit('update:priority', $event.target.value)"
        >
          <option value="low">Basse</option>
          <option value="medium">Moyenne</option>
          <option value="high">Haute</option>
          <option value="urgent">Urgente</option>
        </select>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GeneralInfoSection',
    props: {
      requestType: {
        type: String,
        default: ''
      },
      requestTitle: {
        type: String,
        default: ''
      },
      priority: {
        type: String,
        default: 'medium'
      }
    },
    emits: ['update:request-type', 'update:request-title', 'update:priority']
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
  
  input, select, textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
  }
  </style>