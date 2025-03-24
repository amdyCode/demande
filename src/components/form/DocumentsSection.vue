<template>
    <div class="form-section">
      <h3 class="form-section-title">Documents et pièces jointes</h3>
      
      <div class="form-group">
        <label>Documents justificatifs</label>
        <div class="file-upload" @click="triggerFileInput">
          <input 
            type="file" 
            ref="fileInput" 
            multiple 
            @change="handleFileUpload"
            style="display: none"
          >
          <p>Cliquez ou glissez-déposez vos fichiers ici</p>
          <p><small>Formats acceptés: PDF, JPG, PNG (Max: 10MB)</small></p>
        </div>
        
        <div class="file-list">
          <div v-for="(file, index) in files" :key="index" class="file-item">
            <span>{{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)</span>
            <span class="remove-file" @click="removeFile(index)">×</span>
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label for="additionalInfo">Informations complémentaires</label>
        <textarea 
          id="additionalInfo" 
          placeholder="Ajoutez toute information supplémentaire pertinente..."
          :value="additionalInfo"
          @input="$emit('update:additional-info', $event.target.value)"
        ></textarea>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DocumentsSection',
    props: {
      files: {
        type: Array,
        default: () => []
      },
      additionalInfo: {
        type: String,
        default: ''
      }
    },
    emits: ['update:files', 'update:additional-info'],
    methods: {
      triggerFileInput() {
        this.$refs.fileInput.click()
      },
      handleFileUpload(event) {
        const newFiles = Array.from(event.target.files)
        this.$emit('update:files', [...this.files, ...newFiles])
      },
      removeFile(index) {
        const updatedFiles = [...this.files]
        updatedFiles.splice(index, 1)
        this.$emit('update:files', updatedFiles)
      }
    }
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
  
  textarea {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    min-height: 120px;
    resize: vertical;
  }
  
  .file-upload {
    border: 2px dashed #ddd;
    padding: 2rem;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 1rem;
    transition: border-color 0.3s;
  }
  
  .file-upload:hover {
    border-color: var(--secondary);
  }
  
  .file-list {
    margin-top: 1rem;
  }
  
  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: var(--light);
    border-radius: 5px;
    margin-bottom: 0.5rem;
  }
  
  .remove-file {
    color: var(--danger);
    cursor: pointer;
  }
  </style>