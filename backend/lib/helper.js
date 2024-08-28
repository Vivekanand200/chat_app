import { userSocketIDs } from "../server.js";

export const getOtherMember = (members, userId) => members.find((member) => member._id.toString() !== userId.toString());


export const getSockets = (users = []) => {
     console.log("Received users:", users);
     const sockets = users.map((user) => {
          const socketID = userSocketIDs.get(user.toString());
          if (!socketID) {
               console.log(`No socket ID found for user: ${user}`);
          }
          return socketID;
     });
     console.log("Mapped sockets:", sockets);
     return sockets;
};



export const getBase64 = (file) =>
     `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;


