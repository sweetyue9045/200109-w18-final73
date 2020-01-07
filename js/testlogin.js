$(document).ready(function () {
    // 引入 Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyAScJw62d8pXsaIsKfOZCEgEulba3zEM4A",
        authDomain: "myhw-1e54b.firebaseapp.com",
        databaseURL: "https://myhw-1e54b.firebaseio.com",
        projectId: "myhw-1e54b",
        storageBucket: "myhw-1e54b.appspot.com",
        messagingSenderId: "554428849870",
        appId: "1:554428849870:web:7895cb62ded17676f33a9f",
        measurementId: "G-RT9RF5S570"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const auth = firebase.auth()

    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log(`${user.email} is login...`)
        }
    })
    $("#btnSignIn").click(function (e) {
        $("#btnSignIn").html(`<span class= "spinner-border spinner-border-sl"></span>`)
        auth.signInWithEmailAndPassword($("#email").val(), $("#password").val())
            .then(function (e) {
                $("#btnSignIn").html(`登入`)
                window.location.reload()
            })
            .catch(function (e) {
                if (confirm("查無此帳號，是否以此帳密直接註冊") == true) {
                    $("#btnSignIn").html(`登入`)
                    auth.createUserWithEmailAndPassword($("#email").val(), $("#password").val())
                        .then(function (e) {
                            // 儲存成功後顯示訊息
                            message.innerHTML = 'User created successfully';
                        }).catch(function (e) {
                            $("#sign-info").html(e.message)
                        })
                } else { window.location.href = "../index.html" }
            })
    })
    $("#btnSignOut").click(function (e) {
        auth.signOut()
        $("#email").val('')
        $("#password").val('')
        $("#sign-info").html("No one login...")
        window.location.reload()
    })
    // //google
    // const $btnGoogle = $("#btnGoogleSingIn")

    // var provider = new firebase.auth.GoogleAuthProvider()
    // $btnGoogle.click(function () {
    //     $btnGoogle.html(`<span class= "spinner-border spinner-border-sm"></span>`)
    //     firebase.auth().signInWithPopup(provider).then(function (result) {
    //         var token = result.credential.accessToken;
    //         var user = result.user;      // 使用者資訊
    //     }).catch(function (error) {
    //         // 處理錯誤
    //         $btnGoogle.html(`google`)
    //         alert("error")
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         var email = error.email;      // 使用者所使用的 Email
    //         var credential = error.credential;
    //         console.log(error.message)
    //     });
    // })

})