

export const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
        "https://chat-app-frontend-ruby-nu.vercel.app" // Add your frontend URL here
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};

export const CHATAPP_TOKEN = "chatApp-token"