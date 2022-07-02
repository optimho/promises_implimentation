const makeFakeRequest = (url) =>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
        const pages = {
            '/users': [
                {id:1, username: 'bilbo'},
                {id:3, username: 'Esmeralda'}
            ],
            '/users/1': {
                id: 1,
                username: 'bilbo',
                upvotes: 360,
                city: 'Lisbon',
                topPostID: 454321
            },
            '/users/5': {
                id: 5,
                username: 'Esmeralda',
                upvotes: 571,
                city: 'Honolulu'
            },
            '/users/1': {
                id: 1,
                username: 'bilbo',
                upvotes: 360,
                city: 'Lisbon',
                topPostID: 454321
            },
            '/posts/454321': {
                id: 454321,
                title: 'Ladies and gentlemen, may I introduce my pet pig, Hamlet'
            },
            '/about' : 'This is the about page '
        }

        const data = pages[url]
        if (data){
            resolve({status: 200, data:data})
            }
            else {
                reject ({status: 404})
            }

        },1000)
    })
}

makeFakeRequest('/users')
    .then((res)=> {
        const id = res.data[0].id
        return makeFakeRequest(`/users/${id}`);
    })
    .then((res)=>{
        const postId = res.data.topPostID
        return makeFakeRequest(`/posts/${postId}`)
    })
    .then((res) => {
        console.log('Success!!')
        console.log(res)
})
    .catch((err) =>{
        console.log(`There is  an error ${err}`)
    })


