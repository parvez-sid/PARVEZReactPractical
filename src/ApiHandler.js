var axios = require("axios"),
    BASE_URL = process.env.REACT_APP_API_HOST,
    registerURL = "/users/signup",
    loginURL = "/users/login",
    hobbiesURL = "/hobbies/get_all",
    usersURL = "/users/get_all",
    friendRequestURL = "/friend_request/send",

    ApiHandler = {
        signUp : function(payload, callback) {
          axios.post(BASE_URL + registerURL, payload)
            .then(response => {
              return response;
            })
            .catch(function (error) {
              return error;
            })
            .then(callback);
        },
        
        signIn: function(payload, cb) {
          axios.post(BASE_URL + loginURL, payload)
            .then(res => {
              return res;
            })
            .catch(function(error) {
              return error;
            })
            .then(cb);
        },

        getUsers : function(cb){
          axios.get(BASE_URL + usersURL)
          .then(response => {
            return response;
          })
          .catch(function(error) {
            return error;
          })
          .then(cb);
        },

        getHobbies : function(cb){
          axios.get(BASE_URL + hobbiesURL)
          .then(response => {
            return response;
          })
          .catch(function(error) {
            return error;
          })
          .then(cb);
        },

        sendRequest : function(payload, callback) {
          axios.post(BASE_URL + friendRequestURL, payload)
            .then(response => {
              return response;
            })
            .catch(function (error) {
              return error;
            })
            .then(callback);
        },
      };
    module.exports = ApiHandler;