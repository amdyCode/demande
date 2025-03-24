<template>
  <div class="request-processing-container">

    <main class="container">
      <section class="page-title">
        <h1>Traitement des Demandes</h1>
        <button class="btn btn-primary" @click="exportRequests">Exporter</button>
      </section>
      
      <section class="filter-container">
        <div class="filter-row">
          <div class="filter-group">
            <label for="statusFilter">Statut</label>
            <select v-model="filters.status" id="statusFilter">
              <option value="">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="processing">En traitement</option>
              <option value="approved">Approuvé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="typeFilter">Type de demande</label>
            <select v-model="filters.type" id="typeFilter">
              <option value="">Tous les types</option>
              <option value="administrative">Demande administrative</option>
              <option value="leave">Congé</option>
              <option value="equipment">Demande de matériel</option>
              <option value="other">Autre</option>
            </select>
          </div>
          
          <div class="filter-group">
            <label for="dateFilter">Date de soumission</label>
            <input type="date" v-model="filters.date" id="dateFilter">
          </div>
          
          <div class="filter-group">
            <label for="searchFilter">Recherche</label>
            <input type="text" v-model="filters.search" id="searchFilter" placeholder="Rechercher...">
          </div>
        </div>
        
        <div class="filter-actions">
          <button class="btn btn-outline" @click="resetFilters">Réinitialiser</button>
          <button class="btn" @click="applyFilters">Appliquer les filtres</button>
        </div>
      </section>
      
      <section class="request-list">
        <table class="request-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titre</th>
              <th>Type</th>
              <th>Demandeur</th>
              <th>Date de soumission</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="request in filteredRequests" :key="request.id">
              <td>{{ request.id }}</td>
              <td>{{ request.title }}</td>
              <td>{{ request.type }}</td>
              <td>{{ request.requester }}</td>
              <td>{{ request.submissionDate }}</td>
              <td>
                <span :class="getStatusBadgeClass(request.status)">
                  {{ getStatusLabel(request.status) }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn view-btn" @click="openRequestModal(request)">Voir</button>
                  <button v-if="request.status === 'pending' || request.status === 'processing'" 
                          class="action-btn approve-btn" 
                          @click="approveRequest(request)">
                    Approuver
                  </button>
                  <button v-if="request.status === 'pending' || request.status === 'processing'" 
                          class="action-btn reject-btn" 
                          @click="rejectRequest(request)">
                    Rejeter
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="pagination">
          <button @click="changePage(-1)">«</button>
          <button 
            v-for="pageNum in totalPages" 
            :key="pageNum" 
            :class="{ active: pageNum === currentPage }"
            @click="goToPage(pageNum)"
          >
            {{ pageNum }}
          </button>
          <button @click="changePage(1)">»</button>
        </div>
      </section>
    </main>

    <details-demande 
      :request="selectedRequest" 
      :visible="isModalVisible"
      @close="closeRequestModal"
      @approve="approveRequest"
      @reject="rejectRequest"
    />

  </div>
</template>

<script>
import DetailsDemande from '../components/ui/DetailsDemande.vue'


export default {
  name: 'RequestProcessingView',
  components: {
    DetailsDemande
  },
  data() {
    return {
      requests: [
        {
          id: '#2025-001',
          title: 'Demande de congés annuels',
          type: 'Congé',
          requester: 'Marie Dubois',
          submissionDate: '15/03/2025',
          status: 'pending',
          description: 'Je souhaite prendre mes congés annuels du 1er au 15 avril 2025.',
          startDate: '01/04/2025',
          endDate: '15/04/2025',
          priority: 'Moyenne',
          files: [
            { name: 'Formulaire_conges.pdf', type: 'pdf' },
            { name: 'Planning_equipe.xlsx', type: 'xlsx' }
          ],
          comments: [
            {
              author: 'Thomas Martin',
              role: 'Manager',
              date: '16/03/2025 14:30',
              content: 'Je confirme que j\'assurerai le remplacement pendant cette période.'
            }
          ]
        },
      ],
      filters: {
        status: '',
        type: '',
        date: '',
        search: ''
      },
      selectedRequest: null,
      isModalVisible: false,
      currentPage: 1,
      itemsPerPage: 5
    }
  },
  computed: {
    filteredRequests() {
      return this.requests.filter(request => {
        const matchStatus = !this.filters.status || request.status === this.filters.status
        const matchType = !this.filters.type || request.type === this.filters.type
        const matchDate = !this.filters.date || request.submissionDate.startsWith(this.filters.date.slice(5))
        const matchSearch = !this.filters.search || 
          request.title.toLowerCase().includes(this.filters.search.toLowerCase()) ||
          request.requester.toLowerCase().includes(this.filters.search.toLowerCase())
        
        return matchStatus && matchType && matchDate && matchSearch
      })
    },
    totalPages() {
      return Math.ceil(this.filteredRequests.length / this.itemsPerPage)
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
    openRequestModal(request) {
      this.selectedRequest = request
      this.isModalVisible = true
    },
    closeRequestModal() {
      this.isModalVisible = false
      this.selectedRequest = null
    },
    approveRequest(request) {
      const index = this.requests.findIndex(r => r.id === request.id)
      if (index !== -1) {
        this.requests[index].status = 'approved'
      }
      this.closeRequestModal()
    },
    rejectRequest(request) {
      const index = this.requests.findIndex(r => r.id === request.id)
      if (index !== -1) {
        this.requests[index].status = 'rejected'
      }
      this.closeRequestModal()
    },
    exportRequests() {
      // Implement export functionality
      alert('Fonctionnalité d\'exportation à implémenter')
    },
    resetFilters() {
      this.filters = {
        status: '',
        type: '',
        date: '',
        search: ''
      }
    },
    applyFilters() {
      // Filters are applied automatically via computed property
      this.currentPage = 1
    },
    changePage(delta) {
      const newPage = this.currentPage + delta
      if (newPage > 0 && newPage <= this.totalPages) {
        this.currentPage = newPage
      }
    },
    goToPage(pageNum) {
      this.currentPage = pageNum
    }
  }
}
</script>

<style>
.page-title {
                        padding: 2rem 0;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .page-title h1 {
                        font-size: 2rem;
                        color: var(--primary);
                    }
                    
                    .filter-container {
                        background-color: white;
                        border-radius: 10px;
                        padding: 1.5rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                        margin-bottom: 2rem;
                    }
                    
                    .filter-row {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 1rem;
                        margin-bottom: 1rem;
                    }
                    
                    .filter-group {
                        flex: 1;
                        min-width: 200px;
                    }
                    
                    .filter-group label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-weight: 600;
                        color: var(--dark);
                    }
                    
                    .filter-group select, .filter-group input {
                        width: 100%;
                        padding: 0.8rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        font-size: 1rem;
                    }
                    
                    .filter-actions {
                        display: flex;
                        justify-content: flex-end;
                        gap: 1rem;
                    }
                    
                    .btn {
                        display: inline-block;
                        padding: 0.8rem 1.5rem;
                        background-color: var(--secondary);
                        color: white;
                        text-decoration: none;
                        border-radius: 5px;
                        transition: background-color 0.3s;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                    }
                    
                    .btn:hover {
                        background-color: #2980b9;
                    }
                    
                    .btn-primary {
                        background-color: var(--primary);
                    }
                    
                    .btn-primary:hover {
                        background-color: #1a2530;
                    }
                    
                    .btn-success {
                        background-color: var(--success);
                    }
                    
                    .btn-success:hover {
                        background-color: #27ae60;
                    }
                    
                    .btn-danger {
                        background-color: var(--danger);
                    }
                    
                    .btn-danger:hover {
                        background-color: #c0392b;
                    }
                    
                    .btn-warning {
                        background-color: var(--warning);
                    }
                    
                    .btn-warning:hover {
                        background-color: #d35400;
                    }
                    
                    .btn-outline {
                        background-color: transparent;
                        border: 1px solid var(--secondary);
                        color: var(--secondary);
                    }
                    
                    .btn-outline:hover {
                        background-color: var(--secondary);
                        color: white;
                    }
                    
                    .request-list {
                        background-color: white;
                        border-radius: 10px;
                        padding: 1.5rem;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    }
                    
                    .request-table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    
                    .request-table th {
                        text-align: left;
                        padding: 1rem;
                        border-bottom: 2px solid #eee;
                        color: var(--primary);
                    }
                    
                    .request-table td {
                        padding: 1rem;
                        border-bottom: 1px solid #eee;
                    }
                    
                    .request-table tr:hover {
                        background-color: #f8f9fa;
                    }
                    
                    .status-badge {
                        display: inline-block;
                        padding: 0.25rem 0.75rem;
                        border-radius: 20px;
                        font-size: 0.875rem;
                        font-weight: 600;
                        text-align: center;
                    }
                    
                    .status-pending {
                        background-color: rgba(241, 196, 15, 0.2);
                        color: var(--pending);
                    }
                    
                    .status-approved {
                        background-color: rgba(46, 204, 113, 0.2);
                        color: var(--approved);
                    }
                    
                    .status-rejected {
                        background-color: rgba(231, 76, 60, 0.2);
                        color: var(--rejected);
                    }
                    
                    .status-processing {
                        background-color: rgba(155, 89, 182, 0.2);
                        color: var(--processing);
                    }
                    
                    .action-buttons {
                        display: flex;
                        gap: 0.5rem;
                    }
                    
                    .action-btn {
                        padding: 0.5rem;
                        border-radius: 5px;
                        border: none;
                        cursor: pointer;
                        color: white;
                    }
                    
                    .view-btn {
                        background-color: var(--info);
                    }
                    
                    .approve-btn {
                        background-color: var(--success);
                    }
                    
                    .reject-btn {
                        background-color: var(--danger);
                    }
                    
                    .pagination {
                        display: flex;
                        justify-content: center;
                        margin-top: 2rem;
                        gap: 0.5rem;
                    }
                    
                    .pagination button {
                        padding: 0.5rem 1rem;
                        border: 1px solid #ddd;
                        background-color: white;
                        border-radius: 5px;
                        cursor: pointer;
                        transition: all 0.3s;
                    }
                    
                    .pagination button:hover {
                        background-color: var(--light);
                    }
                    
                    .pagination button.active {
                        background-color: var(--secondary);
                        color: white;
                        border-color: var(--secondary);
                    }
                    
                    .modal {
                        display: none;
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 100;
                        overflow-y: auto;
                    }
                    
                    .modal-content {
                        background-color: white;
                        margin: 5% auto;
                        width: 90%;
                        max-width: 800px;
                        border-radius: 10px;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                        position: relative;
                    }
                    
                    .modal-header {
                        padding: 1.5rem;
                        border-bottom: 1px solid #eee;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    
                    .modal-title {
                        font-size: 1.5rem;
                        color: var(--primary);
                    }
                    
                    .close-modal {
                        font-size: 1.5rem;
                        background: none;
                        border: none;
                        cursor: pointer;
                        color: var(--dark);
                    }
                    
                    .modal-body {
                        padding: 1.5rem;
                        max-height: 70vh;
                        overflow-y: auto;
                    }
                    
                    .modal-footer {
                        padding: 1.5rem;
                        border-top: 1px solid #eee;
                        display: flex;
                        justify-content: flex-end;
                        gap: 1rem;
                    }
                    
                    .request-details-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1.5rem;
                        margin-bottom: 1.5rem;
                    }
                    
                    .request-detail-item {
                        margin-bottom: 1rem;
                    }
                    
                    .request-detail-label {
                        font-weight: 600;
                        color: var(--dark);
                        margin-bottom: 0.5rem;
                    }
                    
                    .request-detail-value {
                        padding: 0.5rem;
                        background-color: var(--light);
                        border-radius: 5px;
                    }
                    
                    .request-description {
                        grid-column: 1 / span 2;
                    }
                    
                    .document-list {
                        margin-top: 1.5rem;
                    }
                    
                    .document-item {
                        display: flex;
                        align-items: center;
                        padding: 0.5rem;
                        background-color: var(--light);
                        border-radius: 5px;
                        margin-bottom: 0.5rem;
                    }
                    
                    .document-icon {
                        margin-right: 0.5rem;
                        color: var(--secondary);
                    }
                    
                    .document-download {
                        margin-left: auto;
                        color: var(--primary);
                        cursor: pointer;
                    }
                    
                    .comments-section {
                        margin-top: 1.5rem;
                    }
                    
                    .comment-item {
                        padding: 1rem;
                        border-left: 3px solid var(--secondary);
                        background-color: #f8f9fa;
                        margin-bottom: 1rem;
                    }
                    
                    .comment-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 0.5rem;
                        font-size: 0.875rem;
                        color: var(--dark);
                    }
                    
                    .new-comment {
                        margin-top: 1.5rem;
                    }
                    
                    .new-comment textarea {
                        width: 100%;
                        padding: 0.8rem;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        margin-bottom: 1rem;
                        resize: vertical;
                        min-height: 100px;
                    }
                    
                    footer {
                        background-color: var(--primary);
                        color: white;
                        padding: 2rem 0;
                        text-align: center;
                        margin-top: 3rem;
                    }
                    
                    @media (max-width: 768px) {
                        .nav-links {
                            display: none;
                        }
                        
                        .filter-row {
                            flex-direction: column;
                        }
                        
                        .request-table {
                            font-size: 0.875rem;
                        }
                        
                        .request-table th:nth-child(4),
                        .request-table td:nth-child(4) {
                            display: none;
                        }
                        
                        .action-buttons {
                            flex-direction: column;
                        }
                        
                        .request-details-grid {
                            grid-template-columns: 1fr;
                        }
                        
                        .request-description {
                            grid-column: 1;
                        }
                    }
</style>
