import axios from 'axios'

var sendLogTime = 0

function handleError(res) {
    var data = res.data;
    if(data.code) {
        data.msg += `（${data.code}）`;
    }
    return data;
}

function get(url, options={}, timeoutTime) {
  return request('get', url, '', options, timeoutTime);
}

function put(url, form, options={}, timeoutTime) {
  return request('put', url, form, options, timeoutTime);
}

function post(url, form, options={}, timeoutTime) {
  return request('post', url, form, options, timeoutTime);
}

function request(method, url, form, options = {}, timeoutTime = 60000) {
    var timeout = null
    var req = method == 'get' ?
        axios.get(url, {...options,
            timeout: timeoutTime
        }) :
        axios[method](url, form, {...options,
            timeout: timeoutTime
        });
    return Promise.race([
        req,
        new Promise((resolve, reject) => {
            timeout = setTimeout(function() {
                reject('timeout');
            }, options.timeout || timeoutTime)
        })
    ]).then((res) => {
        clearTimeout(timeout);
        return res;
    }, (res) => {
        if (res == 'timeout') {
            return Promise.reject('Timeout');
        }
        return Promise.reject('Timeout');
    });
}

export default {
    signup: function(username, password) {
      var url = "http://127.0.0.1:3000/signup";
      var form_data = {
        username,
        password
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    login: function(username, password) {
      var url = "http://127.0.0.1:3000/login";
      var form_data = {
        username,
        password
      }
      return post(url, form_data, {
        withCredentials: true
      }).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    logout: function() {
      var url = "http://127.0.0.1:3000/logout";
      return get(url, {
        withCredentials: true
      }).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    saveBoard: function(board, username, name, tag) {
      var url = "http://127.0.0.1:3000/save";
      var form_data = {
        board,
        username,
        name,
        tag
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    getBoard: function(username) {
      var url = "http://127.0.0.1:3000/getBoard";
      var form_data = {
        username
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    getBoardByBoard: function(board) {
      var url = "http://127.0.0.1:3000/getBoardByBoard";
      var form_data = {
        board
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        return res.data
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    getBoardById: function(id) {
      var url = "http://127.0.0.1:3000/getBoardById";
      var form_data = {
        id
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    deleteBoard: function(id) {
      var url = "http://127.0.0.1:3000/deleteBoard";
      var form_data = {
        id
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    saveTemplate: function(board, username, saveName, savePicture) {
      var url = "http://127.0.0.1:3000/saveTemplate";
      var form_data = {
        board,
        username,
        saveName,
        savePicture
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    getTemplates: function(username) {
      var url = "http://127.0.0.1:3000/getTemplates";
      var form_data = {
        username
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    checkUserPassword: function(username, password) {
      var url = "http://127.0.0.1:3000/checkUserPassword";
      var form_data = {
        username,
        password
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    changePassword: function(username, password) {
      var url = "http://127.0.0.1:3000/changePassword";
      var form_data = {
        username,
        password
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    },
    changeUsername: function(username, newUsername) {
      var url = "http://127.0.0.1:3000/changeUsername";
      var form_data = {
        username,
        newUsername
      }
      return post(url, form_data).then(res => {
        console.log('res', res);
        if (res.data.code == 200) {
          return res.data
        } else {
          return Promise.reject(res);
        }
      }).catch(e => {
        return Promise.reject(e);
      })
    }
}
