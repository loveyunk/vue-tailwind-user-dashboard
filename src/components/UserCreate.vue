<template>
  <div
    v-show="dialog"
    class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center "
  >
    <div
      class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>

    <div
      class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto"
    >
      <div class="modal-content py-4 text-left px-6">
        <!--Title-->
        <div class="flex justify-between items-center pb-3">
          <p class="text-xl font-bold">
            {{ type === 'create' ? '创建' : '更新' }}
          </p>
          <div class="modal-close cursor-pointer z-50" @click="close">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
              ></path>
            </svg>
          </div>
        </div>

        <!-- Body -->
        <div class="form-group">
          <label class="label" for="username">
            姓名
          </label>
          <input
            class="input"
            id="username"
            type="text"
            placeholder="Username"
            v-model="newUser.name"
          />
        </div>

        <div class="form-group">
          <label class="label" for="age">
            年龄
          </label>
          <input
            class="input"
            id="age"
            type="text"
            placeholder="Age"
            v-model="newUser.age"
          />
        </div>

        <div class="form-group">
          <label class="label" for="sex">
            性别
          </label>
          <select
            v-model="newUser.isMale"
            class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="sex"
          >
            <option :value="true">男</option>
            <option :value="false">女</option>
          </select>
        </div>

        <div class="form-group">
          <label class="label" for="phone">
            电话
          </label>
          <input
            class="input"
            :class="{ error: $v.newUser.phone.$error }"
            id="phone"
            type="text"
            placeholder="Phone"
            v-model="newUser.phone"
            @blur="$v.newUser.phone.$touch()"
          />
        </div>

        <div class="form-group">
          <label class="label" for="email">
            邮箱
          </label>
          <input
            class="input"
            id="email"
            type="text"
            placeholder="Email"
            v-model="newUser.email"
          />
        </div>

        <!-- Footer -->
        <div class="flex justify-end pt-2">
          <button
            @click="dialogOk"
            class="px-4 bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
          >
            确定
          </button>
          <button
            @click="close"
            class="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  model: {
    prop: 'dialog',
    event: 'update'
  },

  props: {
    dialog: {
      type: Boolean,
      required: true
    },

    type: {
      type: String,
      default: 'create',
      validator: function(value) {
        return ['create', 'update'].indexOf(value) !== -1;
      }
    },

    user: {
      type: Object
    }
  },

  data() {
    return {
      newUser: null
    };
  },

  watch: {
    user: {
      handler() {
        if (this.user) {
          this.newUser = { ...this.user };
        } else {
          this.newUser = this.createFreshUserObject();
        }
      },
      immediate: true
    }
  },

  validations: {
    newUser: {
      name: { required },
      phone: { required },
      age: { required },
      isMale: { required },
      email: { required }
    }
  },

  methods: {
    createFreshUserObject() {
      const id = Math.floor(Math.random() * 10000000);

      return {
        id,
        name: '',
        phone: '',
        age: null,
        isMale: null,
        email: ''
      };
    },

    dialogOk() {
      this.$emit('on-ok', this.newUser, this.type);
    },

    close() {
      this.$emit('update', false);
    }
  }
};
</script>

<style lang="css" scoped>
.form-group {
  @apply flex items-center mb-4;
}

.label {
  @apply w-16 text-gray-700 text-base font-bold mr-3;
}

.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}

.input.error {
  @apply border-red-500;
}

.input:focus {
  @apply outline-none shadow-outline;
}
</style>
