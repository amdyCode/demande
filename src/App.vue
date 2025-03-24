<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from './components/ui/AppFooter.vue'
import AppHeader from './components/ui/AppHeader.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
:root {
  --primary: #2c3e50;
  --secondary: #3498db;
  --success: #2ecc71;
  --danger: #e74c3c;
  --warning: #f39c12;
  --light: #ecf0f1;
  --dark: #34495e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
    gap: 1rem;
  }
  
  .btn {
    width: 100%;
    text-align: center;
  }
}
</style>