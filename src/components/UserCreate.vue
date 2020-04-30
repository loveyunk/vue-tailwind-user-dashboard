<template>
  <transition name="fade">
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
            <div class="field-wrapper">
              <input
                class="input"
                :class="{ error: $v.newUser.name.$error }"
                id="username"
                type="text"
                placeholder="Username"
                v-model="newUser.name"
                @blur="$v.newUser.name.$touch()"
              />
              <template v-if="$v.newUser.name.$error">
                <p v-if="!$v.newUser.name.required" class="errorMessage">
                  请输入您的姓名
                </p>
              </template>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="age">
              年龄
            </label>
            <div class="field-wrapper">
              <input
                class="input"
                :class="{ error: $v.newUser.age.$error }"
                id="age"
                type="text"
                placeholder="Age"
                v-model="newUser.age"
                @blur="$v.newUser.age.$touch()"
              />
              <template v-if="$v.newUser.age.$error">
                <p v-if="!$v.newUser.age.required" class="errorMessage">
                  请输入您的年龄
                </p>
              </template>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="sex">
              性别
            </label>
            <div class="field-wrapper">
              <select
                v-model="newUser.isMale"
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                :class="{ error: $v.newUser.isMale.$error }"
                id="sex"
              >
                <option :value="true">男</option>
                <option :value="false">女</option>
              </select>
              <template v-if="$v.newUser.isMale.$error">
                <p v-if="!$v.newUser.isMale.required" class="errorMessage">
                  请选择性别
                </p>
              </template>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="phone">
              电话
            </label>
            <div class="field-wrapper">
              <input
                class="input"
                :class="{ error: $v.newUser.phone.$error }"
                id="phone"
                placeholder="Phone"
                v-model="newUser.phone"
                @blur="$v.newUser.phone.$touch()"
              />
              <template v-if="$v.newUser.phone.$error">
                <p v-if="!$v.newUser.phone.required" class="errorMessage">
                  您输入您的手机号
                </p>
                <p v-if="!$v.newUser.phone.phone" class="errorMessage">
                  手机号格式不正确
                </p>
              </template>
            </div>
          </div>

          <div class="form-group">
            <label class="label" for="email">
              邮箱
            </label>
            <div class="field-wrapper">
              <input
                class="input"
                :class="{ error: $v.newUser.email.$error }"
                id="email"
                type="text"
                placeholder="Email"
                v-model="newUser.email"
                @blur="$v.newUser.email.$touch()"
              />
              <template v-if="$v.newUser.email.$error">
                <p v-if="!$v.newUser.email.required" class="errorMessage">
                  请输入您的邮箱
                </p>
                <p v-if="!$v.newUser.email.email" class="errorMessage">
                  邮箱格式不正确
                </p>
              </template>
            </div>
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
  </transition>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

const phoneReg = /^1[34578]\d{9}$/;
const phone = value => {
  if (!value) return true;
  return phoneReg.test(value);
};

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
    },

    dialog() {
      if (!this.dialog) {
        this.newUser = this.createFreshUserObject();
        this.$v.$reset();
      }
    }
  },

  validations: {
    newUser: {
      name: { required },
      phone: { required, phone },
      age: { required },
      isMale: { required },
      email: { required, email }
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
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit('on-ok', this.newUser, this.type);
      }
    },

    close() {
      this.$emit('update', false);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.form-group {
  @apply flex items-center mb-4 pb-2;
}

.field-wrapper {
  @apply relative flex flex-col flex-1;
}

.label {
  @apply w-12 text-gray-700 text-base font-bold mr-1;
}

.input {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight;
}

.error {
  @apply border-red-500;
}

.errorMessage {
  @apply absolute text-xs text-red-500;
  bottom: -18px;
}

.input:focus {
  @apply outline-none shadow-outline;
}
</style>
