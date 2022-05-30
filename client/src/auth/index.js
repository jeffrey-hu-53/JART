import React, { createContext, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "./auth-request-api";
import { GlobalCommunityContext } from "../community";
import { GameContext } from "../game";
import { SocketContext } from "../socket";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const AuthContext = createContext();

console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
  GET_LOGGED_IN: "GET_LOGGED_IN",
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
  REGISTER_USER: "REGISTER_USER",
  SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  DELETE_ACCOUNT: "DELETE_ACCOUNT",
  CREATE_GUEST: "CREATE_GUEST",
  SEARCH_USERS: "SEARCH_USERS",
  SET_FRIENDS_AND_REQUESTS: "SET_FRIENDS_AND_REQUESTS",
  // UPDATE_BIO: "UPDATE_BIO",
};

function AuthContextProvider(props) {
  const [auth, setAuth] = useState({
    user: null,
    loggedIn: false,
    errorMessage: null,
    isGuest: false, //Add this to the setAuth in the reducer
    searchUsers: [],
    friends: [],
    friendRequests: [],
    userData: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordVerify: "",
      username: "",
    },
  });
  const history = useHistory();
  const { community } = useContext(GlobalCommunityContext);
  const { game } = useContext(GameContext);
  const socket = useContext(SocketContext);

  const [load, setLoad] = useState(false);

  useEffect(() => {
    auth.getLoggedIn();
  }, []);

  const authReducer = (action) => {
    const { type, payload } = action;
    switch (type) {
      case AuthActionType.GET_LOGGED_IN: {
        return setAuth({
          user: payload.user,
          loggedIn: payload.loggedIn,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: payload.friends,
          friendRequests: payload.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.LOGIN_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: payload.friends,
          friendRequests: payload.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.LOGOUT_USER: {
        return setAuth({
          user: null,
          loggedIn: false,
          errorMessage: null,
          isGuest: false, //Add this to the setAuth in the reducer
          searchUsers: [],
          friends: [],
          friendRequests: [],
          userData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordVerify: "",
            username: "",
          },
        });
      }
      case AuthActionType.REGISTER_USER: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.CREATE_GUEST: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: true,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.SET_ERROR_MESSAGE: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: payload.message,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: payload.userData,
        });
      }
      case AuthActionType.CHANGE_PASSWORD: {
        return setAuth({
          user: payload.user,
          loggedIn: true,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.RESET_PASSWORD: {
        return setAuth({
          user: authReducer.user,
          loggedIn: false,
          errorMessage: payload.message,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.DELETE_ACCOUNT: {
        return setAuth({
          user: payload.user,
          loggedIn: false,
          errorMessage: null,
          isGuest: false, //Add this to the setAuth in the reducer
          searchUsers: [],
          friends: [],
          friendRequests: [],
          userData: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            passwordVerify: "",
            username: "",
          },
        });
      }
      case AuthActionType.SEARCH_USERS: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: payload,
          friends: auth.friends,
          friendRequests: auth.friendRequests,
          userData: auth.userData,
        });
      }
      case AuthActionType.SET_FRIENDS_AND_REQUESTS: {
        return setAuth({
          user: auth.user,
          loggedIn: auth.loggedIn,
          errorMessage: auth.errorMessage,
          isGuest: auth.isGuest,
          searchUsers: auth.searchUsers,
          friends: payload.friends,
          friendRequests: payload.friendRequests,
          userData: auth.userData,
        });
      }
      // case AuthActionType.UPDATE_BIO: {
      //   return setAuth({
      //     user: payload.user,
      //     loggedIn: true,
      //     errorMessage: auth.errorMessage,
      //     isGuest: auth.isGuest,
      //     searchUsers: auth.searchUsers,
      //     friends: auth.friends,
      //     friendRequests: auth.friendRequests,
      //   });
      // }
      default:
        return auth;
    }
  };

  //#region friend functions
  auth.addFriendByEmail = async function (email) {
    console.log("Adding friend By Email");
    let response = await api.findByEmail(email);
    if (response.status === 200) {
      console.log(email);
      auth.sendFriendRequest(auth.user.email, email);
    } else {
      console.log("No email found");
      console.log(response);
    }
  };

  auth.sendFriendRequest = async function (sentUserEmail, receivedUserEmail) {
    console.log("sending friend request");
    console.log("The sent user email is" + sentUserEmail);
    console.log("the received user email is" + receivedUserEmail);

    try {
      const response = await api.friendRequest(
        sentUserEmail,
        receivedUserEmail
      );
      console.log("response:", response);
      if (response.status === 200) {
        let sentUser = response.data.sentUser;
        console.log("send friend request updating friends and requests");
        let friendRequestIds = sentUser.requests;
        let friendIds = sentUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });

        history.push("/");
        return true;
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
    return false;
  };

  auth.addFriend = async function (sentUserEmail, receivedUserEmail) {
    console.log("adding friend");
    try {
      const response = await api.friend(sentUserEmail, receivedUserEmail);
      console.log("response:", response);
      if (response.status === 200) {
        let receivedUser = response.data.receivedUser;

        console.log("add friend updating friends and requests");

        let friendRequestIds = receivedUser.requests;
        let friendIds = receivedUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        console.log("current friends:", friends);

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.removeFriendRequest = async function (sentUserEmail, receivedUserEmail) {
    console.log("removing friend request");
    try {
      const response = await api.removeFriendRequest(
        sentUserEmail,
        receivedUserEmail
      );
      console.log("response:", response);
      if (response.status === 200) {
        let receivedUser = response.data.receivedUser;

        console.log("remove friend request updating friends and requests");

        let friendRequestIds = receivedUser.requests;
        let friendIds = receivedUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }

        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.removeFriend = async function (currentEmail, externalUserEmail) {
    console.log("removing friend");
    try {
      const response = await api.removeFriend(currentEmail, externalUserEmail);
      console.log("response:", response);

      if (response.status === 200) {
        let currentUser = response.data.sentUser;
        console.log("remove friend updating friends and requests");

        let friendRequestIds = currentUser.requests;
        let friendIds = currentUser.friends;

        let friendRequests = [];
        let friends = [];

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        authReducer({
          type: AuthActionType.SET_FRIENDS_AND_REQUESTS,
          payload: {
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      //auth.setErrorMessage(error.response.data.errorMessage);
    }
    history.push("/");
  };

  auth.search = async function (username) {
    console.log(username);
    let response = await api.searchUsers(username);
    if (response.status === 200) {
      console.log(response.data.usernames);
      authReducer({
        type: AuthActionType.SEARCH_USERS,
        payload: response.data.usernames,
      });
    } else {
      console.log(response);
    }
  };
  //#endregion friend functions

  auth.deleteAccount = async function (password) {
    try {
      console.log("attempt to delete account...");
      console.log(auth.user._id);
      const response = await api.deleteAccount(auth.user._id, password);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.DELETE_ACCOUNT,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
      return true;
    } catch (error) {
      console.log(error.response.data.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage, auth.userData);
      return false;
    }
  };

  auth.resetPassword = async function (email) {
    if (email.indexOf("@") === -1) {
      console.log("what?>");
      auth.setErrorMessage(
        "Please enter a valid email address!",
        auth.userData
      );
      return false;
    }
    try {
      const response = await api.resetPassword(email);
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.RESET_PASSWORD,
          payload: {
            message: response.message,
          },
        });
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  auth.changePassword = async function (
    username,
    currPassword,
    newPassword,
    newPassVerify
  ) {
    try {
      const response = await api.changePassword(
        username,
        currPassword,
        newPassword,
        newPassVerify
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.CHANGE_PASSWORD,
          payload: {
            user: response.data.user,
          },
        });
        return true;
      }
    } catch (error) {
      console.log(error.response.data.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage, auth.userData);
      return false;
    }
  };

  auth.setErrorMessage = function (message, userData) {
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: { message: message, userData: userData },
    });
  };
  auth.removeErrorMessage = function () {
    authReducer({
      type: AuthActionType.SET_ERROR_MESSAGE,
      payload: { message: null, userData: auth.userData },
    });
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  auth.getLoggedIn = async function () {
    setLoad(true);
    console.log("trying to get log in info");
    try {
      const response = await api.getLoggedIn();
      if (response.status === 200) {
        let user = response.data.user;
        console.log("updating friends and friend requests");
        let friendRequestIds = user.requests;
        let friendIds = user.friends;
        if (socket.id != null) {
          socket.emit("socket-username", user.username, socket.id);
        } else {
          await delay(1500);
          socket.emit("socket-username", user.username, socket.id);
        }

        let friendRequests = [];
        let friends = [];

        console.log("friendRequestIds:", friendRequestIds);
        console.log("friendIds:", friendIds);

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }

        authReducer({
          type: AuthActionType.GET_LOGGED_IN,
          payload: {
            loggedIn: response.data.loggedIn,
            user: user,
            friends: friends,
            friendRequests: friendRequests,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
  };

  auth.registerUser = async function (
    firstName,
    lastName,
    email,
    password,
    passwordVerify,
    username
  ) {
    try {
      const response = await api.registerUser(
        firstName,
        lastName,
        email,
        password,
        passwordVerify,
        username,
        false
      );
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.REGISTER_USER,
          payload: {
            user: response.data.user,
          },
        });
        history.push("/");
      }
    } catch (error) {
      let userD = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordVerify: passwordVerify,
        username: username,
      };
      console.log(error.response.data.errorMessage);
      console.log(auth.errorMessage);
      auth.setErrorMessage(error.response.data.errorMessage, userD);
    }
  };

  auth.loginUser = async function (username, password) {
    try {
      const response = await api.loginUser(username, password);
      console.log("response:", response);

      if (response.status === 200) {
        let user = response.data.user;
        console.log("login updating friends and requests");
        console.log("Before socket call");
        console.log("the socket id is", socket.id);
        socket.emit("socket-username", username, socket.id);
        console.log("Here");
        let friendRequestIds = user.requests;
        let friendIds = user.friends;

        let friendRequests = [];
        let friends = [];

        console.log("friendRequestIds:", friendRequestIds);
        console.log("friendIds:", friendIds);

        for (let i = 0; i < friendRequestIds.length; i++) {
          if (friendRequestIds[i].username) {
            friendRequests.push(friendRequestIds[i]);
          } else {
            try {
              let response = await api.findById(friendRequestIds[i]);
              friendRequests.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }
        for (let i = 0; i < friendIds.length; i++) {
          if (friendIds[i].username) {
            friends.push(friendIds[i]);
          } else {
            try {
              let response = await api.findById(friendIds[i]);
              friends.push(response.data.user);
            } catch (err) {
              continue;
            }
          }
        }

        authReducer({
          type: AuthActionType.LOGIN_USER,
          payload: {
            user: user,
            friends: friends,
            friendRequests: friendRequests,
          },
        });
        history.push("/");
      }
    } catch (error) {
      let userD = {
        firstName: auth.userData ? auth.userData.firstName : "",
        lastName: auth.userData ? auth.userData.lastName : "",
        email: auth.userData ? auth.userData.email : "",
        password: password,
        passwordVerify: auth.userData ? auth.userData.passwordVerify : "",
        username: username,
      };
      console.log(error);
      auth.setErrorMessage(error.response.data.errorMessage, userD);
    }
  };

  auth.logoutUser = async function () {
    try {
      const response = await api.logoutUser();
      history.push("/");
      if (response.status === 200) {
        authReducer({
          type: AuthActionType.LOGOUT_USER,
          payload: null,
        });
      }
    } catch (err) {
      console.log("react: logout failed!");
      console.log(err);
    }
  };

  auth.getUserInitials = function () {
    let initials = "";
    if (auth.user) {
      initials += auth.user.firstName.charAt(0);
      initials += auth.user.lastName.charAt(0);
    }
    console.log("user initials: " + initials);
    return initials;
  };

  auth.createGuest = async function (username, lobbyCode) {
    console.log("making guest");
    try {
      const response = await api.createGuest(username, true);
      if (response.status === 200) {
        let user = response.data.newUser;
        authReducer({
          type: AuthActionType.CREATE_GUEST,
          payload: {
            user: user,
          },
        });
        //lobby push
        console.log(response.data.newUser);
        // history.push("/lobby/"+lobbyCode);
      }
      // game.hostNewLobby();
      return "user";
    } catch (error) {
      console.log(error);
      auth.setErrorMessage(error.response.data.errorMessage, auth.userData);
      return "bad";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
      }}
    >
      {props.children}
      <Modal open={load}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            p: 4,
          }}
        >
          <CircularProgress />
        </Box>
      </Modal>
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
