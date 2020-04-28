<template>
  <div>
    <UserFilter
      :query="$route.query"
      @on-create-user="createUser"
      @on-search-user="searchUser"
    ></UserFilter>

    <UserList
      :users="users"
      @on-update-user="updateUser"
      @on-delete-user="deleteUser"
    ></UserList>

    <UserCreate
      v-model="dialog"
      :user="user"
      :type="dialogType"
      @on-ok="dialogOk"
    ></UserCreate>

    <div class="text-right pr-2">
      <template v-if="page !== 1">
        <router-link
          class="text-blue-500"
          :to="{ name: 'user', query: { page: page - 1 } }"
          rel="prev"
        >
          上一页
        </router-link>
        <template v-if="hasNextPage">
          |
        </template>
      </template>

      <router-link
        class="text-blue-500"
        v-if="hasNextPage"
        :to="{ name: 'user', query: { page: page + 1 } }"
        rel="next"
      >
        下一页
      </router-link>
    </div>
  </div>
</template>

<script>
import UserList from '../components/UserList';
import UserCreate from '../components/UserCreate';
import UserFilter from '../components/UserFilter';
import UserService from '../services/UserService';

import omitEmpty from 'omit-empty';
import isEqual from 'lodash/isEqual';

export default {
  components: {
    UserList,
    UserCreate,
    UserFilter
  },

  data() {
    return {
      loading: false,
      users: [],
      user: null,
      dialog: false,
      dialogType: 'create',
      usersTotal: 0,
      perPage: 5,
      page: 1
    };
  },

  computed: {
    hasNextPage() {
      return this.usersTotal > this.page * this.perPage;
    }
  },

  watch: {
    $route: {
      handler({ query }) {
        this.getUsers(query);
      },
      immediate: true
    }
  },

  methods: {
    async getUsers(query) {
      this.loading = true;

      const { page, ...rest } = query;

      const params = omitEmpty({
        _page: page || this.page,
        _limit: this.perPage,
        ...rest
      });

      const res = await UserService.queryUserList(params);

      this.users = Object.freeze(res.data);
      this.usersTotal = parseInt(res.headers['x-total-count']);
      this.page = +query.page || 1;
      this.loading = false;
    },

    refreshUsers(query = {}) {
      const newQuery = { ...this.$route.query, ...query };

      if (!isEqual(newQuery, this.$route.query)) {
        this.$router.push({
          path: this.$route.path,
          query: {
            ...newQuery
          }
        });
      } else {
        this.getUsers(newQuery);
      }
    },

    searchUser(query) {
      this.refreshUsers({ ...query, page: '1' });
    },

    createUser() {
      this.user = null;
      this.dialogType = 'create';
      this.dialog = true;
    },

    updateUser(user) {
      this.user = { ...user };
      this.dialogType = 'update';
      this.dialog = true;
    },

    async deleteUser(id) {
      this.loading = true;

      await UserService.removeUser(id);

      this.refreshUsers({
        page: String(
          this.users.length === 1 && this.page > 1 ? this.page - 1 : this.page
        )
      });
    },

    async dialogOk(user, type) {
      if (type === 'create') {
        await UserService.createUser({ ...user });
      } else {
        await UserService.updateUser(user.id, { ...user });
      }

      this.dialog = false;
      this.refreshUsers();
    }
  }
};
</script>
