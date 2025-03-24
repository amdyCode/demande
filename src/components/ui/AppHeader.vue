<template>
  <header>
    <div class="container">
      <nav>
        <div class="logo">GDA</div>
        <ul class="nav-links">
          <li><router-link to="/">Accueil</router-link></li>
          <li><router-link to="/nouvelle-demande">Nouvelle Demande</router-link></li>
          <li><router-link to="/mes-demandes">Mes Demandes</router-link></li>
          <li><router-link to="/administration">Administration</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
header {
  background-color: var(--primary);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
}

.nav-links li {
  margin-left: 1.5rem;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: var(--secondary);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>