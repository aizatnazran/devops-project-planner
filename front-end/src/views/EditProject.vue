<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" v-model="title" required />
    <label>Details</label>
    <textarea v-model="details" required></textarea>
    <label>Assignee</label>
    <select v-model="assignee">
      <option v-for="staff in staffs" :key="staff.id" :value="staff.id">
        {{ staff.name }}
      </option>
    </select>
    <button>Update Project</button>
  </form>
</template>

<script>
import Swal from 'sweetalert2';
import config from '../../config';
export default {
  props: ['id'],
  data() {
    return {
      title: '',
      details: '',
      assignee: null,
      staffs: [],
    };
  },
  mounted() {
    this.fetchProject();
    this.fetchStaffs();
  },
  methods: {
    fetchProject() {
      fetch(`${config.API_URL}/projects/${this.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          this.title = data.title;
          this.details = data.details;
          this.assignee = data.assignee;
        })
        .catch((err) => console.error('Error fetching project:', err));
    },
    fetchStaffs() {
      fetch(`${config.API_URL}/staffs`)
        .then((res) => res.json())
        .then((data) => (this.staffs = data))
        .catch((err) => console.error('Error fetching staffs:', err));
    },
    handleSubmit() {
      fetch(`${config.API_URL}/projects/${this.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: this.title,
          details: this.details,
          assignee: this.assignee,
        }),
      })
        .then(() => {
          Swal.fire({
            title: 'Success!',
            text: 'Project successfully edited',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push('/');
          });
        })
        .catch((err) => {
          console.error('Error editing project:', err);
          Swal.fire({
            title: 'Error!',
            text: 'Failed to edit project',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
    },
  },
};
</script>

<style></style>
