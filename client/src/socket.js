import { io } from 'socket.io-client'

export  const socket  = io("https://devcollab-ov0h.onrender.com",{
    withCredentials:true
})

// 

// import { io } from 'socket.io-client'

// export  const socket  = io("http://localhost:5000",{
//     withCredentials:true
// })
