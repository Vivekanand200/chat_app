
export const sampleChats = [
    {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "Rahul Kumar",
        _id: "1",
        groupChat: false,
        members: ["1", "2", "3"]
    },
    {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "lavkush Kumar",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    },
    {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200", "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200", "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200", "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "Group Kumar",
        _id: "3",
        groupChat: false,
        members: ["1", "2", "3", "4",]
    },
];

export const sampleUsers = [
    {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "Rahul Kumar",
        _id: "1",
    },
    {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "lavkush Kumar",
        _id: "2",
    }]


export const sampleNotification = [{
    sender: {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "Rahul Kumar",
    }
    ,
    _id: "1",
},
{
    sender: {
        avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
        name: "lavkush Kumar",
    }
    ,

    _id: "2",
}];

export const sampleMessage = [
    {
        attachments: [
            {
                public_id: "asdas",
                url: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
            }
        ],
        content: "panchati ka message hai",
        _id: "hdfbvefvbhf",
        sender: {
            _id: "user._id",
            name: "chaman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    },
    {
        attachments: [
            {
                public_id: "sdfbs",
                url: "https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTE2Ni1wLWwxZGJ1cTN2LnBuZw.png"
            }
        ],
        content: "panchati 2 ka message hai",
        _id: "hdfbvefvbhfdghj",
        sender: {
            _id: "sdfsdfd",
            name: "Raman",
        },
        chat: "chatId",
        createdAt: "2024-02-12T10:41:30.630Z",
    }
]

export const dashboardData = {
    users: [
        {
            avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            name: "Rahul Kumar",
            _id: "1",
            username: "rahul",
            friends: 20,
            groups: 5,
        },
        {
            avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            name: "lavkush Kumar",
            _id: "2",
            username: "lavkush",
            friends: 10,
            groups: 6,
        }
    ],
    chats: [
        {
            name: "lavkush Kumar",
            avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            _id: "1",
            groupChat: false,
            members: [
                {
                    _id: "1",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },
                {
                    _id: "2",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },

            ],
            totalMembers: 10,
            totalMessages: 30,
            creator: {
                name: "lavkush Kumar",
                avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            }
        },
        {
            name: "Rahul Kumar",
            avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            _id: "2",
            groupChat: true,
            members: [
                {
                    _id: "1",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },
                {
                    _id: "2",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },
            ],
            totalMembers: 2,
            totalMessages: 31,
            creator: {
                name: "Rahul Kumar",
                avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            }
        },
        {
            name: "lund Kumar",
            avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            _id: "3",
            groupChat: true,
            members: [
                {
                    _id: "1",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },
                {
                    _id: "2",
                    avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"
                },
            ],
            totalMembers: 10,
            totalMessages: 30,
            creator: {
                name: "lund Kumar",
                avatar: ["https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200"],
            }
        },
    ],
    messages:[
        {
            attachments: [],
            content: "rahul ka message",
            _id:"1",
            sender:{
                avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200",
                name:"Chaman",
            },
            chat:"chatId",
            groupChat: false,
            createdAt: "2024-02-12T10:41:30.630Z",
            
        },
        {
            attachments: [
                {
                    public_id: "kjvj",
                    url:"https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvam9iNjgwLTE2Ni1wLWwxZGJ1cTN2LnBuZw.png",
                }
            ],
            content: "lavkush ka message",
            _id:"2",
            sender:{
                avatar: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1&resize=300%2C200",
                name:"Raman",
            },
            chat:"chatId",
            groupChat: true,
            createdAt: "2024-11-12T10:41:30.630Z",
            
        }
    ]

}