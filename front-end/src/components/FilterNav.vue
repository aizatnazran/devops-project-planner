<template>
  <nav class="filter-nav">
    <button @click="updateFilter('all')" :class="{ active: current === 'all' }">View All</button>
    <button @click="updateFilter('completed')" :class="{ active: current === 'completed' }">
      Completed
    </button>
    <button @click="updateFilter('ongoing')" :class="{ active: current === 'ongoing' }">
      Ongoing
    </button>
    <router-link :to="{ name: 'AddProject' }" class="create-project-btn">
      Add New Project
    </router-link>
  </nav>
</template>

<script>
export default {
  props: ['current'],
  methods: {
    updateFilter(by) {
      this.$emit('filterChange', by);
    },
  },
};
</script>

<style>
.filter-nav button {
  margin-right: 10px;
  border: none;
  outline: none;
  color: #bbb;
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  background: none;
}
.filter-nav button.active {
  color: #555;
}

.filter-nav .create-project-btn {
  margin-left: auto;
  color: #fff;
  background-color: #5cb85c;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 14px;
  text-decoration: none;
}

.filter-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
