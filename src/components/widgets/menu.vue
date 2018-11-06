<template lang="html">
  <div class="header">
    <div class="simulator" @click="backToSimulator"></div>
    <slot></slot>
    <div class="user-area">
      <div class="user-login" v-if="this.username == ''">
        <div class="login menu" @click="gotoLogin">
          login
        </div>
        <div class="signup menu" @click="gotoSignup">
          signup
        </div>
      </div>
      <div class="user-info" v-if="this.username != ''">
        <div class="username menu" @click="showUserPage">
          {{ username }}
        </div>
        <div class="logout menu" @click="logout">
          logout
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../../service.js';

export default {
  data() {
    return {
      username: ''
    }
  },
  mounted() {
    service.login().then((res) => {
      this.username = res.data.username;
      this.$emit('username', res.data.username)
    }).catch((e) => {
      console.log('no cookie: ', e);
    });
  },
  methods: {
    backToSimulator: function() {
      this.$router.push('logicCircuit');
    },
    gotoLogin: function() {
      this.$router.push('login');
    },
    gotoSignup: function() {
      this.$router.push('signup');
    },
    logout: function() {
      service.logout().then((res) => {
        window.location.reload();
      })
    },
    showUserPage: function() {
      this.$router.push('userPage');
    }
  }
}
</script>

<style lang="less">
.header {
  border: solid 1px;
  width: 100%;
  height: 10%;
  position: relative;
  .simulator, .user-area {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .simulator {
    left: 30px;
    height: 50px;
    width: 50px;
    background: url('../../images/logo.png') center no-repeat;
    background-size: contain;
  }
  .menu {
    background-color: #cccccc;
    border-radius: 10px;
  }
  .user-area {
    right: 3%;
    .menu {
      display: inline-block;
      padding: 5px;
    }
    .username, .logout {
      user-select: none;
      background: none;
    }
  }
}
</style>
