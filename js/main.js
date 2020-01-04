//----------各種click----------
var searchbar = 0;
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
	// let db = firebase.database();
	// let storageRef = firebase.storage().ref();
	//--登入--
	const auth = firebase.auth()
	auth.onAuthStateChanged(function (user) {
		if (user) {
			$("#sign-info").html(`${user.email} is login...`)
			$("#plusroute").attr("style","display:block")
		}else{
			$("#plusroute").attr("style","display:none")
		}
	})
	$("#btnSignIn").click(function (e) {
		$("#btnSignIn").html(`<span class= "spinner-border spinner-border-sm"></span>`)
		auth.signInWithEmailAndPassword($("#email").val(), $("#password").val())
			.then(function (e) {
				$("#btnSignIn").html(`Sign In`)
				window.location.reload()
			})
			.catch(function (e) {
				$("#btnSignIn").html(`Sign In`)
				if (confirm("查無此帳號，是否以此帳密直接註冊") == true) {
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
		window.location.href = "../index.html"
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
			else $('#backtotop').stop().animate({ bottom: "-65px" });
		}
		else {
			$('#backtotop').stop().animate({ bottom: "-65px" });
		}
	}).scroll();
	$('#backtotop').click(function () { $('html,body').animate({ scrollTop: 0 }, 800); });
	var slide = 0;
	//----------景點----------
	//--輪播速度--
	$('.carousel').carousel({
		interval: 3500
	})
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
	$('.showintro').hide();
	$('.introback').click(function (event) {
		$('.showintro').fadeOut();
	});
	$('.closeBtn1').click(function (event) {
		$('.showintro').fadeOut();
	});
	$('.closeBtn2').click(function (event) {
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
		})
	})
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
	route.on("value", function (only) {
		only.forEach(function (area) {
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
	route.on("value", function (only) {
		only.forEach(function (area) {
			area.forEach(function (myroute) {
				myroute.forEach(function (title) {
					var TData = title.val();
					if (TData.title == id.id) {
						var b = TData.place.length
						$(".intro_intro").append('<div class="tourline_title">' + TData.title + '</div><div class="tourline_intro">' + TData.intro + '</div>')
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
		})
	})
	$('.showintro').fadeIn();
}
function showin2(id) {
	$(".tourline").empty()
	$(".intro_intro").empty()
	var route = firebase.database().ref().orderByKey();
	route.on("value", function (only) {
		only.forEach(function (area) {
			area.forEach(function (myroute) {
				myroute.forEach(function (title) {
					var TData = title.val();
					if (TData.title == id) {
						var b = TData.place.length
						$(".intro_intro").append('<div class="tourline_title">' + TData.title + '</div><div class="tourline_intro">' + TData.intro + '</div>')
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
		})
	})
	$('.showintro').fadeIn();
}
