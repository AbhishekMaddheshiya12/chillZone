// import { rooms } from "../index.js";

// const getSocket = async(users=[]) =>{
//     const sockets = await users.map((user) => rooms.get(user.toString()));
//     return sockets;
// }

// export {getSocket};


import { userSocketIDs } from "../index.js";

export const getSockets = (users = []) => {
  const sockets = users
    .map((user) => userSocketIDs.get(user.toString()))
    .filter(Boolean); // Filter out undefined socket IDs
  return sockets;
};


