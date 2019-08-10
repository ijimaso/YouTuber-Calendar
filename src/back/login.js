document.getElementById('login-button').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    firebase.auth().signInWithPopup(provider).then((result) => {
        console.log('Login Success!');
        console.dir(result)
        const userName = result.additionalUserInfo.profile.name;
        document.getElementById('user-name').innerHTML = userName;
    }).catch((error) => {
        console.error(error);
    })
})
