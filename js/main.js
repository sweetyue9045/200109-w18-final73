//----------各種click----------
var searchbar = 0;
let loginuser="";
let likedata = []

$(function () {
	//----------firebase----------
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
			$("#plusroute").attr("style", "display:block")
			$("#btnSignOut").attr("style", "display:block")
			$("#members").attr("style", "display:block")
			$("#login").attr("style", "display:none")
			$("#plusroute_h").attr("style", "display:block")
			$("#btnSignOut_h").attr("style", "display:block")
			$("#members_h").attr("style", "display:block")
			$("#login_h").attr("style", "display:none")
			$("#like_btn").attr("disabled", false)
			loginuser = user.uid

		} else {
			loginuser = ""
			console.log(`"${loginuser}"no one is login...`)
			$("#plusroute").attr("style", "display:none")
			$("#btnSignOut").attr("style", "display:none")
			$("#members").attr("style", "display:none")
			$("#login").attr("style", "display:block")
			$("#plusroute_h").attr("style", "display:none")
			$("#btnSignOut_h").attr("style", "display:none")
			$("#members_h").attr("style", "display:none")
			$("#login_h").attr("style", "display:block")
			$("#like_btn").attr("disabled", "disabled")
			
		}
	})
	$('.loginback').click(function (event) {
		$('.showlogin').fadeOut();
	});



	//----------各種scroll----------
	var top = $('.container').offset().top - 55
	var down = $('footer').offset().top
	$(window).scroll(function () {
		if ($(this).scrollTop() > top) {
			$(".home_header").attr("style", "background-color: var(--Dark)")
		}
		else {
			$(".home_header").attr("style", "background-color: transparent ")
		}
	}).scroll();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if ($(this).scrollTop() < down - 600) $('#backtotop').stop().animate({ bottom: "2vw" });
			else $('#backtotop').stop().animate({ bottom: "-6.5vw" });
		}
		else {
			$('#backtotop').stop().animate({ bottom: "-6.5vw" });
		}
	}).scroll();
	$('#backtotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 800); });
	var slide = 0;
	//----------景點----------
	
	//--預設地點點擊--
	$("#dropdown-toggle").click(function () {
		$("#dropdown-menu").slideToggle("");
		if (slide == 1) {
			slide = 0;
			$(".fa-chevron-up").attr("style", "display:none")
			$(".fa-chevron-down").attr("style", "display:block")
		}
		else {
			slide = 1;
			$(".fa-chevron-up").attr("style", "display:block")
			$(".fa-chevron-down").attr("style", "display:none")
		}
	});
	$('body').click(function (evt) {
		if (slide == 1) {
			if (evt.target.id != "dropdown-toggle") {
				$(".fa-chevron-up").attr("style", "display:none")
				$(".fa-chevron-down").attr("style", "display:block")
				$("#dropdown-menu").slideToggle("");
				slide = 0;
			}
		}
	});
	//--搜尋點擊--
	$("#searchitem").click(function () {
		if (searchbar == 0) {
			document.getElementById("dropdown-toggle").style.display = "block";
			document.getElementById("form-control").style.display = "block";
			$("#searchitem").attr("style", "border-radius: 0 0.3vw 0.3vw 0 ;outline: none")
			$("#input-group").animate({ width: '16vw' }, 200);
			searchbar = 1;
		}
		else if (searchbar != 0) {
			update();
		}
	});
	//--搜尋文字輸入--
	$(".form-control").keydown(function (event) {
		if ($('.form-control').val().length == 1 && event.which == 8) {
			document.getElementById('form-control').value = ""
			$('#route_content').fadeOut(20);
			document.getElementById("attraction_content").style.display = "none";
			update();
			$('#route_content').fadeIn();
		}
		if (event.which == 13) {
			$('#route_content').fadeOut(20);
			document.getElementById("attraction_content").style.display = "none";
			update();
			return false;
		}
	});

	//----------行程----------
	$('.showintro').hide();
	//--選擇--
	$("#CheckAll").click(function () {
		$(".items:checkbox").prop("checked", false)
	});

	$(".items").click(function () {
		$("#CheckAll").prop("checked", false)
		var check = $("input[class='items']:checked").length
		if (check == 0) {
			$("#CheckAll").prop("checked", true)
			choosearea = null
			route(choosearea)
		}
	});
	//--搜尋文字輸入--
	$(".route_form_control").keydown(function (event) {
		if ($(".route_form_control").val().length == 1 && event.which == 8) {
			document.getElementById("route_form_control").value = ""
			$('#route_content').fadeOut(20);
			document.getElementById("route_content").style.display = "none";
			change();
			$('#route_content').fadeIn();
		}
		if (event.which == 13) {
			$('#route_content').fadeOut(20);
			document.getElementById("route_content").style.display = "none";
			change();
			return false;
		}
	});
	$(".route_form_control").click(function () {
		$(".items:checkbox").prop("checked", false)
		$("#CheckAll").prop("checked", true)
		choosearea = null
		$('#route_content').fadeOut(20);
		document.getElementById("route_content").style.display = "none";
		route(choosearea)
	})
	//--行程消失--
	$('.introback').click(function (event) {
		$('.showintro').fadeOut();
	});
	$('.closeBtn').click(function (event) {
		$('.showintro').fadeOut();
	});
});

/*----------首頁頁面----------*/
//--抓資料庫 + 渲染行程--
function home_route() {
	$("#route_box").empty()
	var route_box = []
	var route = firebase.database().ref();
	route.on("value", function (only) {
		only.forEach(function (area) {
			if (area.key != "like") {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						route_box.push(TData.title)
						for (k = 0; k < 5; k++) {
							if (TData.title == route_box[k]) {
								$("#route_box").append('<div class="route_content"><a id="' + TData.title + '" " onclick="showin(this)"><div class="route_left"><img src="' + TData.place[0].img + '" alt=""></div><div class="route_right"><div class="route_title">' + TData.title + '</div><div class="route_text">' + TData.route + '</div></div></a></div>')
							}
						}
					})
				})
			}
		})
	})
	$("#route_box").append('<div class="route_content route_plus_content"><a id="route_plus" onclick="routeplus(this)"><div class="route_left"><div class="bus"><div class="fbus"><i class="fas fa-bus"></i></div><div class="fplus"><i class="fas fa-plus-circle"></i></div></div></div><div class="route_right"><div class="route_title">創建我的景點路線</div></div></a></div>')
}
function routeplus(){
	if(loginuser==""){
		showlogin()
	}else {
		window.location.href = "html/plusroute.html"
	}
}
//--抓資料庫--
function home(x) {
	$.get('static/Home.json', function (response) {
		$.each(response, function (index, element) {
			if (index == x) {
				document.getElementById("hot_content_title").innerHTML = element.title;
				document.getElementById("hot_content_text").innerHTML =
					'地址：' + element.address + " <br/> " +
					'電話：' + element.phone + " <br/> " +
					'開放時間：' + element.time + " <br/> <br/> " +
					element.hashtag;
				$("#hot_content_left_img").attr("src", element.img)

			}
		});
	}, 'json')
}
//--點擊hot--
function changecontent(mytab) {
	home(mytab.id);
};
//--自己生成hot--
$(function () {
	home("hot1");
	home_route();

})

/*----------熱門頁面----------*/
//--抓資料庫 + 渲染景點--
function attraction() {
	$.get('../static/attraction.json', function (response) {
		$.each(response, function (index, element) {
			var a = element.length
			for (i = 0; i < a; i++) {
				var attraction = element[i];
				$("#attraction_site").append('<div class="wrap attraction_intbox" data-index="' + attraction.name.toLowerCase() + ' ' + attraction.address + '"><div class="attraction_hover ' + attraction.name + '"><img src="' + attraction.img + '" /><div class="attraction_text"><div class="intbox_title">' + attraction.title + '</div><div class="intbox_address">' + attraction.area + '</div></div><div class="intbox_mask"><div class="intbox_mask_text">地址<br/>' + attraction.address + '<br/>開放時間<br/>' + attraction.time + '<br/>連絡電話<br/>' + attraction.phone + '</div></div></div></div>')
			}
		});
	}, 'json')
}
//--更新景點--
function update() {
	$('#attraction_content').fadeIn();
	var cSearch = $("#c-search");
	var value = $('#form-control').val();
	if (!value) {
		cSearch.html("");
		return;
	};
	cSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
}
//--點擊預設景點--
function area(area) {
	document.getElementById("form-control").value = area.text
	if (area.text == "全部") document.getElementById("form-control").value = ""
	document.getElementById("attraction_content").style.display = "none";
	update()
}

/*----------行程頁面----------*/
//--抓資料庫+渲染行程--
function route(myroutefun) {
	$("#route_content").empty()
	var route = firebase.database().ref().orderByKey();
	route.once("value", function (only) {
		only.forEach(function (area) {
			if (area.key != "like") {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						if (myroutefun != null) {
							for (k = 0; k < choosearea.length; k++) {
								if (myroute.key == choosearea[k]) {
									$("#route_content").append('<div class="wrap" data-index="' + TData.title + ' ' + TData.county + '"><a class="name" id="' + TData.title + '" onclick="showin(this)"><div class="wrap_img"><img src="' + TData.place[0].img + '" alt=""></div><div class="wrap_text"><div class="wrap_title">' + TData.title + '</div><div class="wrap_route">' + TData.route + '</div></div></a></div>')
								}
							}
						}
						if (myroutefun == null) {
							$("#route_content").append('<div class="wrap" data-index="' + TData.title + ' ' + TData.county + '"><a class="name" id="' + TData.title + '" onclick="showin(this)"><div class="wrap_img"><img src="' + TData.place[0].img + '" alt=""></div><div class="wrap_text"><div class="wrap_title">' + TData.title + '</div><div class="wrap_route">' + TData.route + '</div></div></a></div>')
							choosearea = []
						}
					})
				})
			}
		})
	})
	$("#route_content").fadeIn()
}
function change() {
	var rSearch = $("#route_search");
	var value = $('#route_form_control').val();
	if (!value) {
		rSearch.html("");
		return;
	};
	rSearch.html('.wrap:not([data-index*="' + value.toLowerCase() + '"]) {display: none;}');
	$('#route_content').fadeIn();

}
var choosearea = [];
function choose(mychoose) {
	Array.prototype.remove = function () {
		var what, a = arguments, L = a.length, ax;
		while (L && this.length) {
			what = a[--L];
			while ((ax = this.indexOf(what)) !== -1) {
				this.splice(ax, 1);
			}
		}
		return this;
	}
	if (mychoose.checked) {
		document.getElementById("route_form_control").value = ""
		change()
		choosearea.push(mychoose.id);
		if (mychoose.id == "CheckAll") {
			choosearea = null
		}
	}
	else {
		choosearea.remove(mychoose.id)
	}
	document.getElementById("route_content").style.display = "none";
	route(choosearea)
}


/*----------介紹頁面----------*/
function showin(id) {
	$(".tourline").empty()
	$(".intro_intro").empty()
	var route = firebase.database().ref().orderByKey();
	let db = firebase.database();
	var likebtn
	const auth = firebase.auth()
	route.once("value", function (only) {
		only.forEach(function (area) {
			if (area.key != "like") {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						$("#like_btn").attr("name", id.id)
						if (TData.title == id.id) {
							likedata = TData
							db.ref('/like/' + loginuser + '/' + TData.title).once("value", function (snapshop) {
								if (snapshop.val()) { //在裡面
									likebtn = "like"
								} else if (snapshop.val() == null) { //不在裡面
									likebtn = "dislike"
									if (loginuser == null) {
										likebtn = "nlike"
									}
								}
							});
							auth.onAuthStateChanged(function (user) {
								if (user) {
									$("#like_btn").attr("disabled", false)
								} else {
									$("#like_btn").attr("disabled", "disabled")
								}
							})
							var b = TData.place.length
							$(".intro_intro").append('<div class="tourline_title">' + TData.title + '<button type="button" class="btn like_btn" onclick="getlike(this)" id="like_btn" name=""><i class="fas fa-heart ' + likebtn + '" id="like_i"></i><span class="splike">收藏</span></button></div><div class="tourline_intro">' + TData.intro + '</div>')
							for (x = 0; x < b; x++) {
								$(".tourline").append('<div class="tourlineBox"><img src="' + TData.place[x].img + '"><div class="tourlineSpots_Right"><div class="tourlineSpots_title">' + TData.place[x].location + '</div>' + TData.place[x].contents + '</br>地址：' + TData.place[x].address + '<div id="tour_time' + x + '">開放時間：</br></div></div></div>')
								for (i = 0; i < 7; i++) {
									var week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
									$("#tour_time" + x).append(
										`${week[i]}：${TData.place[x].time[i].week}</br>`
									)
								}
								if (x < b - 1) {
									$(".tourline").append('<div class="tourlineBox_distance"><div class="distancebtn"><i class="fas fa-map-marker-alt"></i><a href="https://www.google.com/maps/dir/' + TData.place[x].address + '/' + TData.place[x + 1].address + '" target="_blank">　點擊觀看路線　</a><i class="fas fa-map-marker-alt"></i></div></div>')
								}
							}

						}
					})
				})
			}
		})
	})
	$('.showintro').fadeIn();
};
function showlogin() {
	$(".LOGIN").empty()
	$(".LOGIN").append(
		`
		<h1>LOGO</h1>
		<div class="login_or">
			<div class="l">
				<hr>
			</div>
			<div class="or">快速登入</div>
			<div class="l">
				<hr>
			</div>
		</div>
		<div class="login_btn">
			<button type="button" class="btn btnL btnF" id="facebookSingIn"><i class="fab fa-facebook btnfa"></i>
				<span>Facebook登入</span></button>
			<button type="button" class="btn btnL btnG" id="btnGoogleSingIn"><i class="fab fa-google-plus btnfa"></i>
				<span>Google+登入</span></button>
		</div>
		<div class="login_or">
			<div class="l">
				<hr>
			</div>
			<div class="or">一般登入</div class="or">
			<div class="l">
				<hr>
			</div>
		</div>
		<div class="form-group">
			<button class="btn btni"><i class="fas fa-user" tabindex="-1"></i></button>
			<input type="text" class="login_input" id="email" placeholder="Exampe@mail.com" tabindex="1" autocomplete="off">
		</div>
		<div class="form-group">
			<button class="btn btni"><i class="fas fa-unlock-alt" tabindex="-1"></i></button>
			<input type="password" class="login_input" id="password" placeholder="" tabindex="2" autocomplete="off">
		</div>
		<div class="forgot">忘記帳號 / 密碼 ?</div>
		<div class="button-row">
			<button type="button" class="btn btnSignIn" id="btnSignIn" onclick="login()">登入</button>
		</div>`
	)
	$('.showlogin').fadeIn();
}

function login() {
	const auth = firebase.auth()
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
}
function logout() {
	const auth = firebase.auth()
	auth.signOut()
	$("#email").val('')
	$("#password").val('')
	$("#sign-info").html("No one login...")
	window.location.href = "../index.html"
	loginuser = ""
}
function getlike(name) {
	var name = name.name
	//按愛心
	let db = firebase.database();
	db.ref('/like/' + loginuser + '/' + name).once("value", function (snapshop) {
		if (snapshop.val()) {
			db.ref('/like/' + loginuser + '/' + name).set({});
			$("#like_i").attr("class", "fas fa-heart dislike")
		} else if (snapshop.val() == null) {
			db.ref('/like/' + loginuser + '/' + name).update(likedata)
			$("#like_i").attr("class", "fas fa-heart like")
		}
	});
}

function like() {
	$("#like_box").empty()
	var route = firebase.database().ref();
	route.once("value", function (only) {
		only.forEach(function (area) {
			if (area.key == "like") {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						$("#like_box").append('<div class="route_content"><a id="' + TData.title + '" " onclick="showin(this)"><div class="route_left"><img src="' + TData.place[0].img + '" alt=""></div><div class="route_right"><div class="route_title">' + TData.title + '</div><div class="route_text">' + TData.route + '</div></div></a></div>')
					})
				})
			}
		})
	})
}
function myroute() {
	$("#myroute_box").empty()
	var route = firebase.database().ref();
	route.once("value", function (only) {
		only.forEach(function (area) {
			if (area.key == loginuser) {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						$("#myroute_box").append('<div class="route_content"><a id="' + TData.title + '" " onclick="showupdate(this)"><div class="route_left"><img src="' + TData.place[0].img + '" alt=""></div><div class="route_right"><div class="route_title">' + TData.title + '</div><div class="route_text">' + TData.route + '</div></div></a></div>')
					})
				})
			}
		})
	})
}
function showupdate(id) {
	$(".placetop").empty()
	$("#showBlock").empty()
	var route = firebase.database().ref().orderByKey();
	let db = firebase.database();
	const auth = firebase.auth()
	route.once("value", function (only) {
		only.forEach(function (area) {
			if (area.key != "like") {
				area.forEach(function (myroute) {
					myroute.forEach(function (title) {
						var TData = title.val();
						var txId
						if (TData.title == id.id) {
							$(".placetop").append(`
						<input type="text" id="none" required style="display: none;">
                    <div class="input_main">所在</div>
                    <div class="input">
                        <select name="area" id="area" required disabled="disabled">
                            <option value="">地區</option>
                            <option value="northern">北部</option>
                            <option value="central">中部</option>
                            <option value="southern">南部</option>
                            <option value="eastern">東部</option>
                            <option value="islands">離島</option>
                        </select>
                        <select name="county" id="county" required>
                            <option value="">縣市</option>
                        </select>
                    </div>
                    <div class="input_main">行程名稱</div>
                    <input type="text" name="title" id="title" class="input" placeholder='【...一日遊】...' autocomplete="off"
                        required value="${TData.title}" disabled="disabled">
    
                    <div class="input_main">行程途經</div>
                    <input type="text" name="route" id="route" class="input" placeholder='兩地請用" > "分隔' autocomplete="off"
                        required value="${TData.route}">
    
                    <div class="input_main">介紹此行程</div>
                    <textarea name="intro" id="intro" class="input" required >${TData.intro}</textarea>
    
                </div>
						`)
						
							$('#area option[value="' + myroute.key + '"]').attr('selected', 'selected');
							switch ($("#area").val()) {
								default:
								case "":
									$("#county option").remove();
									var array = ["縣市"];
									$.each(array, function (i, val) {
										$("#county").append($("<option value=''>" + array[i] + "</option>"));
									});
									break;
								case "northern":
									$("#county option").remove();
									var array = ["縣市", "台北", "新北", "基隆", "宜蘭", "桃園", "新竹"];
									$.each(array, function (i, val) {
										if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
										else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
									});
									break;
								case "central":
									$("#county option").remove();
									var array = ["縣市", "苗栗", "台中", "彰化", "南投", "雲林"];
									$.each(array, function (i, val) {
										if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
										else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
									});
									break;
								case "southern":
									$("#county option").remove();
									var array = ["縣市", "嘉義", "台南", "高雄", "屏東"];
									$.each(array, function (i, val) {
										if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
										else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
									});
									break;
								case "eastern":
									$("#county option").remove();
									var array = ["縣市", "花蓮", "台東"];
									$.each(array, function (i, val) {
										if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
										else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
									});
									break;
								case "islands":
									$("#county option").remove();
									var array = ["縣市", "澎湖", "金門", " 馬祖"];
									$.each(array, function (i, val) {
										if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
										else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
									});
									break;
							}
							$('#county option[value="' + TData.county + '"]').attr('selected', 'selected');
							txtId = TData.place.length
							let img = []

							console.log(txtId)
							// var b = TData.place.length
							for (x = 0; x < txtId; x++) {
								$("#showBlock").append(`<div class="place place0">
    
								<div class="input_main">第 ${x + 1} 站</div></br>
								<div class="place_">
									<div class="input_main">地名</div>
									<input type="text" class="input location" id="location${x}" autocomplete="off" required value="${TData.place[x].location}">
									<div class="input_main">地址</div>
									<input type="text" class="input address" id="address${x}" autocomplete="off" required value="${TData.place[x].address}">
									<div class="input_main">介紹</div>
									<textarea type="text" class="input contents" id="contents${x}" autocomplete="off" required>${TData.place[x].contents}</textarea>
									</br>
									<div class="input_main"></div>
									<div class="input_main">圖片</div>
									<span class="sptext">不可更改</span></br>
									<img class="sptextimg" src="${TData.place[x].img}" alt="">
								</div>
								<div class="place_ place_1">
									<div class="input_main">星期一</div>
									<div class="input"><select name="mon${x}" id="time${x}0" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="mon${x}" required autocomplete="off">
									</div>
									<div class="input_main">星期二</div>
									<div class="input"><select name="tue${x}" id="time${x}1" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="tue${x}" required autocomplete="off">
									</div>
									<div class="input_main">星期三</div>
									<div class="input"><select name="wed${x}" id="time${x}2" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="wed${x}" required autocomplete="off">
									</div>
									<div class="input_main">星期四</div>
									<div class="input"><select name="thu${x}" id="time${x}3" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="thu${x}" required autocomplete="off"></div>
									<div class="input_main">星期五</div>
									<div class="input"><select name="fri${x}" id="time${x}4" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="fri${x}" required autocomplete="off"></div>
									<div class="input_main">星期六</div>
									<div class="input"><select name="sat${x}" id="time${x}5" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="sat${x}" required autocomplete="off"></div>
									<div class="input_main">星期日</div>
									<div class="input"><select name="sun${x}" id="time${x}6" required>
											<option value="">開放時間</option>
											<option value="24小時營業">24小時營業</option>
											<option value="公休">公休</option>
											<option value="自訂">自訂</option>
										</select>　<input type="text" name="datetimes" id="sun${x}" required autocomplete="off"></div>
								</div>
							</div>`)
							img.push(TData.place[x].img)
								for (i = 0; i < 7; i++) {
									$('#time' + x + i + ' option[value="' + TData.place[x].time[i].check + '"]').attr('selected', 'selected');
									var timeweek = document.getElementById("time" + x + i).name
									$('#' + timeweek).attr('value', TData.place[x].time[i].week);
									
									if ($('#time' + x + i + ' option[value="' + TData.place[x].time[i].check + '"]').val() != "自訂") {
										var timename1 = document.getElementById("time" + x + i).name
										$('#' + timename1).attr("disabled", true);
									}else{
										var timename2 = document.getElementById("time" + x + i).name
										$('#' + timename2).daterangepicker({
											timePicker: true,
											timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
											timePicker24Hour: true,
											locale: {
												format: 'HH:mm'
											}
										});
									}

								}
								
							}
							$("#submit").click(function () {
								$("#submit").html(`<span class= "spinner-border spinner-border-sm"></span>`)
								if (confirm("確認送出嗎?")) {
									place()
									submit()
									function submit() {
										if ($("#area").val() == "") {
											eval($("#submit").html(`送出`));
										} else if ($("#county").val() == "") {
											eval($("#submit").html(`送出`));
										} else if ($("#title").val() == "") {
											eval($("#submit").html(`送出`));
										} else if ($("#route").val() == "") {
											eval($("#submit").html(`送出`));
										} else if ($("#intro").val() == "") {
											eval($("#submit").html(`送出`));
										} else {
											console.log("here")
											db.ref('/' + loginuser + '/' + $("#area").val() + '/' + $("#title").val().replace(/\//g, "\\") + '/').update(
												{
													"title": $("#title").val(),
													"route": $("#route").val(),
													"intro": $("#intro").val(),
													"place":
														places,
													"county": $("#county").val()
												})
												console.log("here2")
											window.location.reload()
										}
									}
								}
							})
							//存取地點
							var places = [];
							function place() {
								for (i = 0; i < txtId; i++) {
									if ($("#location" + i).val() == "") {
										places = []
										eval($("#submit").html(`送出`))
									} else if ($("#address" + i).val() == "") {
										places = []
										eval($("#submit").html(`送出`))
									} else if ($("#contents" + i).val() == "") {
										places = []
										eval($("#submit").html(`送出`))
									} else if ($('#input-file' + i).val() == "") {
										places = []
										$("#submit").html(`送出`);
										$(".btn-info" + i).attr("style", "background-color: #F08080; border-color: #F08080")
										eval("document.form['input-file'].focus()")
									} else if ($("#mon" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#tue" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#wed" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#thu" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#fri" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#sat" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else if ($("#sun" + i).val() == "") {
										eval($("#submit").html(`送出`));
									} else {
										places.push({
											"location": $("#location" + i).val(),
											"address": $("#address" + i).val(),
											"contents": $("#contents" + i).val(),
											"time": [
												{
													"check": $("#time" + i + "0").val(),
													"week": $("#mon" + i).val()
												},
												{
													"check": $("#time" + i + "1").val(),
													"week": $("#tue" + i).val()
												},
												{
													"check": $("#time" + i + "2").val(),
													"week": $("#wed" + i).val()
												},
												{
													"check": $("#time" + i + "3").val(),
													"week": $("#thu" + i).val()
												},
												{
													"check": $("#time" + i + "4").val(),
													"week": $("#fri" + i).val()
												},
												{
													"check": $("#time" + i + "5").val(),
													"week": $("#sat" + i).val()
												},
												{
													"check": $("#time" + i + "6").val(),
													"week": $("#sun" + i).val()
												}
											],
											"img": img[i]
										})
									}
								}
							}
							//時間
							function time() {
								for (i = 0; i < 7; i++) {
									for (a = 0; a <= txtId; a++) {
										$("#time" + a + i).change(function () {
											var timename = this.name
											switch ($(this).val()) {
												default:
												case "":
													document.getElementById(this.name).value = " "
													$("#" + timename).attr("style", "display:none")
													$("#" + timename).attr("disabled", true)
													break;
												case "24小時營業":
													document.getElementById(this.name).value = "24小時營業"
													$("#" + timename).attr("style", "display:inline-block")
													$("#" + timename).attr("disabled", true)
													break;
												case "公休":
													document.getElementById(this.name).value = "公休"
													$("#" + timename).attr("style", "display:inline-block")
													$("#" + timename).attr("disabled", true)
						
													break;
												case "自訂":
													document.getElementById(this.name).value = ""
													$("#" + timename).attr("placeholder", "點擊選擇時間")
													$("#" + timename).attr("style", "display:inline-block")
													$("#" + timename).attr("disabled", false)
													$("#" + timename).daterangepicker({
														timePicker: true,
														timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
														timePicker24Hour: true,
														locale: {
															format: 'HH:mm'
														}
													});
													break;
											}
										});
									}
								}
							}
							time()
						}
						
						
					})
				})
			}
		})
	})
	$('.showupdate').fadeIn();
}

//remove函式
Array.prototype.remove = function () {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
}


// 漢堡
$(function() {
    $('nav#menu').mmenu();
});
// 漢堡結束