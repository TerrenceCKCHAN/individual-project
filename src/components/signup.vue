<template lang="html">
  <div class="signup">
    <menuHeader></menuHeader>
    <div class="signup-area">
      <div class="title-box">
        <div class="username title">
          username
        </div>
        <div class="error-message" v-show="usernameEmpty">
          * please fill in the username
        </div>
        <div class="error-message" v-show="usernameErr">
          * username already exists
        </div>
      </div>
      <input class="username" type="text" name="" value="" v-model="username">
      <div class="title-box">
        <div class="password title">
          password
        </div>
        <div class="error-message" v-show="passwordEmpty">
          * please fill in the password
        </div>
        <div class="error-message" v-show="passwordErr">
          * passwords don't match
        </div>
      </div>
      <input class="password" type="password" name="" value="" v-model="password">
      <div class="title-box">
        <div class="confirm-password title">
          confirm password
        </div>
        <div class="error-message" v-show="confirmPasswordEmpty">
          * please confirm your password
        </div>
        <div class="error-message" v-show="passwordErr">
          * passwords don't match
        </div>
      </div>
      <input class="confirm-password" type="password" name="" value="" v-model="confirmPassword">
      <button type="button" name="button" @click="submit">submit</button>
    </div>
  </div>
</template>

<script>
import service from '../service.js';
import menuHeader from './widgets/menu.vue';
import crypto from 'crypto';
const secret = 'abcdefg';
// import SHA1 from 'crypto-js/sha1';
// var SHA1 = require("crypto-js/sha1");

export default {
  components: {
    menuHeader
  },
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      usernameEmpty: false,
      passwordErr: false,
      passwordEmpty: false,
      confirmPasswordEmpty: false,
      usernameErr: false
    }
  },
  methods: {
    submit: function() {
      console.log('username: ', this.username, ' password: ', this.password, ' confirm password: ', this.confirmPassword);
      if (this.username.trim() == '' || this.password.trim() == '' || this.confirmPassword.trim() == '' || this.password !== this.confirmPassword) {
        if (this.username.trim() == '') {
          this.usernameEmpty = true;
        } else {
          this.usernameEmpty = false;
        }
        if (this.password.trim() == '') {
          this.passwordEmpty = true;
        } else {
          this.passwordEmpty = false;
        }
        if (this.confirmPassword.trim() == '') {
          this.confirmPasswordEmpty = true;
        } else {
          this.confirmPasswordEmpty = false;
        }
        if (this.password !== this.confirmPassword) {
          this.passwordErr = true;
          this.password = '';
          this.confirmPassword = '';
        } else {
          this.passwordErr = false;
        }
      } else {
        service.signup(this.username, crypto.createHmac('sha256', secret)
                   .update(this.password)
                   .digest('hex')).then(() => {
                     console.log('test=======');
          this.$router.push('/login');
        }).catch((err) => {
          if (!!err.data && err.data.data == 'username already exists') {
            this.usernameErr = true;
          } else {
            this.usernameErr = false;
          }
        });
      }
    }
  }
}
</script>

<style lang="less">
  .signup {
    height: 100%;
    input {
      border: solid 1px;
      margin-bottom: 30px;
    }
    .signup-area {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .title-box {
        padding-bottom: 15px;
        .title {
          line-height: 100%;
        }
        .error-message {
          color: red;
          font-size: 14px;
        }
      }
      button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        border: solid 1px;
        padding: 5px;
      }
    }
  }
</style>
