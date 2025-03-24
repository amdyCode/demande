<template>
    <div class="file-upload-container">
      <div 
        class="file-drop-zone" 
        @dragover.prevent="dragover" 
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
        :class="{ 'dragover': isDragOver }"
      >
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileUpload" 
          multiple 
          style="display: none"
        >
        <p v-if="!files.length">
          Glissez et déposez des fichiers ici ou 
          <a href="#" @click.prevent="$refs.fileInput.click()">
            sélectionnez des fichiers
          </a>
        </p>
        
        <div v-else class="file-list">
          <div 
            v-for="(file, index) in files" 
            :key="index" 
            class="file-item"
          >
            <span>{{ file.name }}</span>
            <span>{{ formatFileSize(file.size) }}</span>
            <button @click="removeFile(index)">✖</button>
          </div>
        </div>
      </div>
      
      <div class="file-upload-actions">
        <button 
          class="btn" 
          @click="$refs.fileInput.click()"
        >
          Ajouter des fichiers
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'File',
    props: {
      maxFiles: {
        type: Number,
        default: 5
      },
      maxFileSize: {
        type: Number,
        default: 10 * 1024 * 1024 // 10MB
      }
    },
    data() {
      return {
        files: [],
        isDragOver: false
      }
    },
    methods: {
      dragover(e) {
        this.isDragOver = true
        e.preventDefault()
      },
      dragleave() {
        this.isDragOver = false
      },
      drop(e) {
        this.isDragOver = false
        this.addFiles(e.dataTransfer.files)
      },
      handleFileUpload(e) {
        this.addFiles(e.target.files)
      },
      addFiles(newFiles) {
        // Convert FileList to Array
        const filesArray = Array.from(newFiles)
        
        // Filter files based on size and total number
        const validFiles = filesArray.filter(file => {
          // Check file size
          if (file.size > this.maxFileSize) {
            alert(`Le fichier ${file.name} est trop volumineux. Limite: ${this.maxFileSize / 1024 / 1024}MB`)
            return false
          }
          return true
        })
        
        // Add new files, respecting max file limit
        const remainingSlots = this.maxFiles - this.files.length
        const filesToAdd = validFiles.slice(0, remainingSlots)
        
        this.files = [...this.files, ...filesToAdd]
        
        // Reset file input
        if (this.$refs.fileInput) {
          this.$refs.fileInput.value = ''
        }
        
        // Emit updated files
        this.$emit('update:files', this.files)
      },
      removeFile(index) {
        this.files.splice(index, 1)
        this.$emit('update:files', this.files)
      },
      formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      }
    }
  }
  </script>
  
  <style scoped>
  .file-drop-zone {
    border: 2px dashed #ccc;
    border-radius: 5px;
    padding: 20px;
    text-align: center;
    transition: background-color 0.3s;
  }
  
  .file-drop-zone.dragover {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .file-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .file-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
  }
  
  .file-item button {
    background: none;
    border: none;
    color: red;
    cursor: pointer;
  }
  </style>