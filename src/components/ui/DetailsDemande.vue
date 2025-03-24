<template>
    <div v-if="visible" class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Détails de la demande {{ request.id }}</h2>
          <button class="close-modal" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="request-details-grid">
            <div class="request-detail-item">
              <div class="request-detail-label">Titre</div>
              <div class="request-detail-value">{{ request.title }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Type</div>
              <div class="request-detail-value">{{ request.type }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Demandeur</div>
              <div class="request-detail-value">{{ request.requester }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Statut</div>
              <div class="request-detail-value">
                <span :class="getStatusBadgeClass(request.status)">
                  {{ getStatusLabel(request.status) }}
                </span>
              </div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Date de soumission</div>
              <div class="request-detail-value">{{ request.submissionDate }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Priorité</div>
              <div class="request-detail-value">{{ request.priority }}</div>
            </div>
            
            <div class="request-detail-item request-description">
              <div class="request-detail-label">Description</div>
              <div class="request-detail-value">{{ request.description }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Date de début</div>
              <div class="request-detail-value">{{ request.startDate }}</div>
            </div>
            
            <div class="request-detail-item">
              <div class="request-detail-label">Date de fin</div>
              <div class="request-detail-value">{{ request.endDate }}</div>
            </div>
          </div>
          
          <div class="document-list" v-if="request.files && request.files.length">
            <h3>Documents joints</h3>
            <div 
              v-for="(file, index) in request.files" 
              :key="index" 
              class="document-item"
            >
              <span class="document-icon">📄</span>
              <span>{{ file.name }}</span>
              <span 
                class="document-download" 
                @click="downloadFile(file)"
              >
                ⬇️ Télécharger
              </span>
            </div>
          </div>
          
          <div class="comments-section" v-if="request.comments">
            <h3>Commentaires</h3>
            <div 
              v-for="(comment, index) in request.comments" 
              :key="index" 
              class="comment-item"
            >
              <div class="comment-header">
                <span>{{ comment.author }} ({{ comment.role }})</span>
                <span>{{ comment.date }}</span>
              </div>
              <div class="comment-content">
                {{ comment.content }}
              </div>
            </div>
            
            <div class="new-comment">
              <h4>Ajouter un commentaire</h4>
              <textarea 
                v-model="newComment" 
                placeholder="Votre commentaire..."
              ></textarea>
              <button class="btn" @click="addComment">Envoyer</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" @click="$emit('close')">Fermer</button>
          <button 
            v-if="request.status !== 'rejected'" 
            class="btn btn-danger" 
            @click="$emit('reject', request)"
          >
            Rejeter
          </button>
          <button 
            v-if="request.status !== 'approved'" 
            class="btn btn-success" 
            @click="$emit('approve', request)"
          >
            Approuver
          </button>
        </div>
      </div>
    </div>
  </template>

  
  
  <script>
  export default {
    name: 'DetailsDemande',
    props: {
      request: {
        type: Object,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        newComment: ''
      }
    },
    methods: {
      getStatusBadgeClass(status) {
        return {
          'status-badge': true,
          'status-pending': status === 'pending',
          'status-processing': status === 'processing',
          'status-approved': status === 'approved',
          'status-rejected': status === 'rejected'
        }
      },
      getStatusLabel(status) {
        const statusLabels = {
          'pending': 'En attente',
          'processing': 'En traitement',
          'approved': 'Approuvé',
          'rejected': 'Rejeté'
        }
        return statusLabels[status]
      },
      downloadFile(file) {
        // Implement file download logic
        alert(`Téléchargement de ${file.name}`)
      },
      addComment() {
        if (this.newComment.trim()) {
          if (!this.request.comments) {
            this.$set(this.request, 'comments', [])
          }
          this.request.comments.push({
            author: 'Utilisateur Actuel',
            role: 'Administrateur',
            date: new Date().toLocaleString('fr-FR', { 
              day: '2-digit', 
              month: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            }),
            content: this.newComment
          })
          this.newComment = ''
        }
      }
    }
  }
  </script>