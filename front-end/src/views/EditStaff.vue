<template>
  <form @submit.prevent="handleSubmit">
    <label>Name</label>
    <input type="text" v-model="name" required />
    <label>Position</label>
    <input type="text" v-model="position" required />
    <button>Update Staff</button>
  </form>
</template>

<script>
import Swal from 'sweetalert2';
import config from '../../config';
export default {
  props: ['id'],
  data() {
    return {
      uri: `${config.API_URL}/staffs/` + this.id,
      name: '',
      position: '',
    };
  },
  mounted() {
    fetch(this.uri)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        this.name = data.name;
        this.position = data.position;
      })
      .catch((err) => {
        console.error('Error fetching staff data:', err);
      });
  },
  methods: {
    handleSubmit() {
      fetch(this.uri, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, position: this.position }),
      })
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Staff Updated Successfully!',
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/staff');
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
