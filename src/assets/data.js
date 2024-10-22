export const user= {
    _id: "66a222937ae7ae3d5414c022",
    firstName: "shine",
    lastName: "bright",
    email: "shinebright@gmail.com",
    password: '',
    profileUrl: 'https://png.pngtree.com/png-clipart/20210331/ourlarge/pngtree-the-sun-shines-bright-light-png-image_3177973.jpg',
    followers:[
        {
            _id: '66a223d57ae7ae3d5414c025',
            firstName: 'sam',
            lastName: 'dwanye',
            email: 'dwayne@gmail.com',
            followers: ['66a222937ae7ae3d5414c022','66a224017ae7ae3d5414c027'],
            profileUrl: 'https://e7.pngegg.com/pngimages/641/1008/png-clipart-uncle-sam-poster-united-states-uncle-sam-zazzle-illustration-comics-uncle-sam-comic-book-poster-thumbnail.png',
            views:[],
            verified: true,
                createdAt: "2022-09-12T10:26:10.519Z",
                updatedAt: "2022-09-12T10:53:16.475Z",
        },
        {
            _id: '66a224017ae7ae3d5414c027',
            firstName: 'franklin',
            lastName: 'jack',
            email: 'jacck@gmail.com',
            followers: ['66a222937ae7ae3d5414c022','66a223d57ae7ae3d5414c025'],
            profileUrl: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/212/2129231591745000781/jpeg-600/G03.jpg',
            createdAt: "2022-01-23T08:13:10.519Z",
            updatedAt: "2022-01-23T08:14:16.475Z",
        },
    ],
    following:['66a223d57ae7ae3d5414c025','66a224017ae7ae3d5414c027'],
    posts:[],
    views:[],
    createdAt: "2023-04-12T03:51:49Z",
    updatedAt: "2023-04-12T04:53:47Z",
    comments: [],
    
};

export const followers = [
    {
        _id: '66a223d57ae7ae3d5414c025',
        firstName: 'sam',
        lastName: 'dwanye',
        email: 'dwayne@gmail.com',
        profileUrl: 'https://e7.pngegg.com/pngimages/641/1008/png-clipart-uncle-sam-poster-united-states-uncle-sam-zazzle-illustration-comics-uncle-sam-comic-book-poster-thumbnail.png'
    },
    {
        _id: '66a224017ae7ae3d5414c027',
        firstName: 'franklin',
        lastName: 'jack',
        email: 'jacck@gmail.com',
        profileUrl: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/212/2129231591745000781/jpeg-600/G03.jpg'
    },
]


export const requests = [
    {
        _id: '66a223d57ae7ae3d5414c025',
        requestFrom: followers[0],
    },
    {
        _id: '66a224017ae7ae3d5414c027',
        requestFrom: followers[3],
    },
]

export const suggest = [
    {
        _id: '66a223d57ae7ae3d5414c025',
        ...followers[0],
    },
    {
        _id: '66a224017ae7ae3d5414c027',
        ...followers[3],
    },
]

export const posts = [
    {
        _id: '66f431502ae7166111fbaf69',
        userId:{
            _id: "66a222937ae7ae3d5414c022",
            firstName: "shine",
            lastName: "bright",
            profileUrl: 'https://png.pngtree.com/png-clipart/20210331/ourlarge/pngtree-the-sun-shines-bright-light-png-image_3177973.jpg',
            location: 'cunnore, ooty',
        },
        description: 'Hello everyone, this is a new video. check it out',
        image:"https://fbi.cults3d.com/uploaders/13960460/illustration-file/aa9edb87-dfc0-4c19-942e-8597a4fbe74b/groot.jpeg",
        // comment:[''],
        likes:['66a222937ae7ae3d5414c022','66a223d57ae7ae3d5414c025']
    },
    {
        _id: '66f44aa33b5855fbe8ce0820',
        userId:{
            _id: '66a223d57ae7ae3d5414c025',
            firstName: 'sam',
            lastName: 'dwanye',
            profileUrl: 'https://e7.pngegg.com/pngimages/641/1008/png-clipart-uncle-sam-poster-united-states-uncle-sam-zazzle-illustration-comics-uncle-sam-comic-book-poster-thumbnail.png',
            location: 'Chengalpattu, Chennai',
        },
        description: '“Flowers are like friends; they bring color to your world.” "The flowers that bloom tomorrow are the seeds you planted today." "In joy or sadness, flowers are our constant friends." "Nothing in nature blooms all year — be patient with yourself."“Flowers are like friends; they bring color to your world.” "The flowers that bloom tomorrow are the seeds you planted today." "In joy or sadness, flowers are our constant friends." "Nothing in nature blooms all year — be patient with yourself."“Flowers are like friends; they bring color to your world.” "The flowers that bloom tomorrow are the seeds you planted today." "In joy or sadness, flowers are our constant friends." "Nothing in nature blooms all year — be patient with yourself.',
        image:"https://images.pexels.com/photos/56866/garden-rose-red-pink-56866.jpeg?cs=srgb&dl=pexels-pixabay-56866.jpg",
        likes: [],
        
    },
    {
        _id: '66f431502ae7166111fbaf72',
        userId:{
            _id: "66a222937ae7ae3d5414c022",
            firstName: "shine",
            lastName: "bright",
            profileUrl: 'https://png.pngtree.com/png-clipart/20210331/ourlarge/pngtree-the-sun-shines-bright-light-png-image_3177973.jpg',
            location: 'cunnore, ooty',
        },
        description: "With a cool and soothing climate almost all year round, Ooty welcomes tourists from far and wide. It’s not just about the mountains and hills, Ooty offers much more to discerning travellers who drive up the winding roads to reach the pinnacle. Lakes, gardens, parks, peaks, waterfalls and simply amazing accommodation options. No wonder Ooty is called the 'Switzerland of India', of such grandeur is the scenic beauty the destination is so well acclaimed for. If you would love to relax over a cup of tea, sitting back and gazing at the vastness of nature, Ooty is indeed the place to be. Besides that, the Nilgiri biosphere is rich in flora and fauna, allowing you to escape into the depths of mystic jungles and explore once-in-a-lifetime experiences.",
        image:"https://miro.medium.com/v2/resize:fit:960/1*bJqRFsHWkiSgIf402vsd5g.jpeg",
        likes: [],
    },
    {
        _id: '66f431502ae7166111fbaf13',
        userId:{
            _id: "66a222937ae7ae3d5414c022",
            firstName: "shine",
            lastName: "bright",
            profileUrl: 'https://png.pngtree.com/png-clipart/20210331/ourlarge/pngtree-the-sun-shines-bright-light-png-image_3177973.jpg',
            location: 'cunnore, ooty',
        },
        description: 'Hello everyone, this is a new video. check it out',
        image:"https://fbi.cults3d.com/uploaders/13960460/illustration-file/aa9edb87-dfc0-4c19-942e-8597a4fbe74b/groot.jpeg",
        likes: [],
    },
    {
        _id: '66f437642ae7166111fbaf70',
        userId:{
            _id: '66a224017ae7ae3d5414c027',
            firstName: 'franklin',
            lastName: 'jack',
            profileUrl: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/212/2129231591745000781/jpeg-600/G03.jpg',
            location: 'Thudiyalur, Coimbatore',
        },
        description: 'Hello everyone, this is a new video. check it out',
        image:"https://fbi.cults3d.com/uploaders/13960460/illustration-file/aa9edb87-dfc0-4c19-942e-8597a4fbe74b/groot.jpeg",
        likes: [],
    },
]

 export const postComments = [
    
        { 
            _id: '66f431502ae7166111fbaf69',
            
                
            userId: {
                _id: "66a224017ae7ae3d5414c027",
                firstName: 'franklin',
                lastname: 'jack',
            },
            postId : '66f431502ae7166111fbaf69',
            comment: 'Hello, Hi',
            from: 'franklin jack',
            profileUrl: 'https://atlas-content-cdn.pixelsquid.com/assets_v2/212/2129231591745000781/jpeg-600/G03.jpg',
        },
        {
            postId : '66f431502ae7166111fbaf99',
            comment: 'Hello, Hi',
            from: 'franklin jack',
            likes: ["66a222937ae7ae3d5414c022"],
            replies: [
                {
                    userId:{
                        _id: "66f431502ae7166111fbce19",
                        firstname: "diana",
                        lastname: "white",
                    },
                    from: "diana white",
                    replyAt: "franklin jack",
                    comment: 'Hi jack',
                    createdAt: "2024-04-23T01:51:49Z",
                    updatedAt: "2024-04-23T02:53:47Z",
                    likes: [],
                    _id: '66f431502ae7166777fbce34'
                }
            ]
        }
       

    
 ]