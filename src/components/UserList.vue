<template>
  <table class="table-auto w-full my-5">
    <thead>
      <tr>
        <th class="td">名字</th>
        <th class="td">年龄</th>
        <th class="td">性别</th>
        <th class="td">电话</th>
        <th class="td">电子邮件</th>
        <th class="td">操作</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="(user, index) in users"
        :key="user.id"
        :class="{ 'bg-gray-100': index % 2 }"
      >
        <td class="td">{{ user.name }}</td>
        <td class="td">{{ user.age }}</td>
        <td class="td">{{ user.isMale ? '男' : '女' }}</td>
        <td class="td">{{ user.phone }}</td>
        <td class="td">{{ user.email }}</td>
        <td class="td text-center">
          <span class="btn" @click="$emit('on-update-user', user)">
            更新
          </span>
          |
          <span class="btn" @click="$emit('on-delete-user', user.id)">
            删除
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="css" scoped>
.td {
  @apply border px-4 py-4;
}

.btn {
  @apply text-blue-500 cursor-pointer;
}
</style>
