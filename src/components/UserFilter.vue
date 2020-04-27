<template>
  <div class="flex justify-between">
    <div class="inline-flex">
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mr-2 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Username"
        v-model="name"
        @keyup.enter="search"
      />

      <button class="btn" @click="search">
        Search
      </button>
    </div>

    <button @click="$emit('on-create-user')" class="btn">
      创建
    </button>
  </div>
</template>

<script>
export default {
  props: {
    query: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  data() {
    return {
      name: ''
    };
  },

  watch: {
    query: {
      handler({ name }) {
        this.name = name;
      },
      immediate: true
    }
  },

  methods: {
    search() {
      this.$emit('on-search-user', { name: this.name });
    }
  }
};
</script>

<style lang="css" scoped>
.btn {
  @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
}

.btn:hover {
  @apply bg-blue-700;
}
</style>
