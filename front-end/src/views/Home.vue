<template>
  <div class="home">
    <FilterNav :current="current" @filterChange="current = $event" />
    <div v-if="projects.length">
      <div v-for="project in filteredProjects" :key="project.id">
        <SingleProject
          :project="project"
          :staffs="staffs"
          @delete="handleDelete"
          @complete="handleComplete"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterNav from '../components/FilterNav.vue';
import SingleProject from '../components/SingleProject.vue';
import config from '../../config';

export default {
  name: 'Home',
  components: { SingleProject, FilterNav },
  data() {
    return {
      projects: [],
      staffs: [],
      current: 'all',
    };
  },
  mounted() {
    this.fetchProjects();
    this.fetchStaffs();
  },
  methods: {
    fetchProjects() {
      fetch(`${config.API_URL}/projects`)
        .then((res) => res.json())
        .then((data) => (this.projects = data))
        .catch((err) => console.log(err));
    },
    fetchStaffs() {
      fetch(`${config.API_URL}/staffs`)
        .then((res) => res.json())
        .then((data) => (this.staffs = data))
        .catch((err) => console.log(err));
    },
    handleDelete(id) {
      fetch(`${config.API_URL}/projects/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          this.projects = this.projects.filter((project) => project.id !== id);
        })
        .catch((err) => console.log(err));
    },
    handleComplete(id) {
      let project = this.projects.find((project) => project.id === id);
      project.complete = !project.complete;

      fetch(`${config.API_URL}/projects/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: project.complete }),
      })
        .then(() => {
          this.fetchProjects(); // Refresh the list
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    filteredProjects() {
      if (this.current === 'completed') {
        return this.projects.filter((project) => project.complete);
      }
      if (this.current === 'ongoing') {
        return this.projects.filter((project) => !project.complete);
      }
      return this.projects;
    },
  },
};
</script>
