var txtId = 0; //新增表單

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
    let db = firebase.database();
    let storageRef = firebase.storage().ref();
    const auth = firebase.auth()
    let loginuser
    auth.onAuthStateChanged(function (user) {
		if (user) {
			console.log(`${user.email} is login...`)
			$("#plusroute").attr("style", "display:block")
			$("#btnSignOut").attr("style", "display:block")
			$("#members").attr("style", "display:block")
			$("#login").attr("style", "display:none")
			$("#like_btn").attr("disabled", false)
			loginuser = user.uid

		} else {
			loginuser = ""
			console.log(`"${loginuser}"no one is login...`)
			$("#plusroute").attr("style", "display:none")
			$("#btnSignOut").attr("style", "display:none")
			$("#members").attr("style", "display:none")
			$("#login").attr("style", "display:block")
			$("#like_btn").attr("disabled", "disabled")
			
		}
	})

    //送出表單
    $("#submit").click(function () {
        $("#submit").html(`<span class= "spinner-border spinner-border-sl"></span>`)
        if (confirm("確認送出嗎?")) {
            place()
            submit()
            function submit() {
                if ($("#area").val().replace(/\s+/g, "") == "") {
                    eval($("#submit").html(`送出`));
                } else if ($("#county").val().replace(/\s+/g, "") == "") {
                    eval($("#submit").html(`送出`));
                } else if ($("#title").val().replace(/\s+/g, "") == "") {
                    eval($("#submit").html(`送出`));
                } else if ($("#route").val().replace(/\s+/g, "") == "") {
                    eval($("#submit").html(`送出`));
                } else if ($("#intro").val().replace(/\s+/g, "") == "") {
                    eval($("#submit").html(`送出`));
                } else {
                    db.ref('/' + loginuser + '/' + $("#area").val() + '/' + $("#title").val().replace(/\//g, "\\") + '/').set(
                        {
                            "title": $("#title").val(),
                            "route": $("#route").val(),
                            "intro": $("#intro").val().replace(/\r\n|\n/g, "</br>"),
                            "place":
                                places,
                            "county": $("#county").val()
                        })
                    window.location.href = "../html/route.html"
                }
            }
        }
    })
    //選擇地點
    $("#area").change(function () {
        switch ($(this).val()) {
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
    });
    //存取地點
    var places = [];
    function place() {
        for (i = 0; i <= txtId; i++) {
            if ($("#location" + i).val().replace(/\s+/g, "") == "") {
                places = []
                eval($("#submit").html(`送出`))
            } else if ($("#address" + i).val().replace(/\s+/g, "") == "") {
                places = []
                eval($("#submit").html(`送出`))
            } else if ($("#contents" + i).val().replace(/\s+/g, "") == "") {
                places = []
                eval($("#submit").html(`送出`))
            } else if ($('#input-file' + i).val() == "") {
                places = []
                $("#submit").html(`送出`);
                $(".btn-info" + i).attr("style", "background-color: #F08080; border-color: #F08080")
                eval("document.form['input-file'].focus()")
            } else if ($("#mon" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#tue" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#wed" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#thu" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#fri" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#sat" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else if ($("#sun" + i).val().replace(/\s+/g, "") == "") {
                eval($("#submit").html(`送出`));
            } else {
                places.push({
                    "location": $("#location" + i).val(),
                    "address": $("#address" + i).val(),
                    "contents": $("#contents" + i).val().replace(/\r\n|\n/g, "</br>"),
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
    //新增地點
    $("#addItem").click(function () {
        txtId++;
        let div = `<div class="place place${txtId}">
                <div class="input_main">第 ${txtId + 1} 站</div></br>
                <div class="place_">
                    <div class="input_main">地名</div>
                    <input type="text" class="input location" id="location${txtId}" autocomplete="off" required>
                    <div class="input_main">地址</div>
                    <input type="text" class="input address" id="address${txtId}" autocomplete="off" required>
                    <div class="input_main">介紹</div>
                    <textarea type="text" class="input contents" id="contents${txtId}" autocomplete="off" required></textarea>
                </br><div class="input_main"></div>
                    <div class="input_main">圖片</div>
                    <label class="btn btn-info btn-info${txtId}">
                        <input class="input-file" type="file" id="input-file${txtId}" name="${txtId}" accept="image/*" required />
                        <span id="i${txtId}">
                        <i class="fa fa-image"></i><span class="sptext">選擇圖片</span></span>
                    </label>
                </div>
                <div class="place_">
                    <div class="input_main">星期一</div>
                    <div class="input"><select name="mon${txtId}" id="time${txtId}0" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="mon${txtId}" required autocomplete="off">
                    </div>
                    <div class="input_main">星期二</div>
                    <div class="input"><select name="tue${txtId}" id="time${txtId}1" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="tue${txtId}" required autocomplete="off">
                    </div>
                    <div class="input_main">星期三</div>
                    <div class="input"><select name="wed${txtId}" id="time${txtId}2" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="wed${txtId}" required autocomplete="off">
                    </div>
                    <div class="input_main">星期四</div>
                    <div class="input"><select name="thu${txtId}" id="time${txtId}3" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="thu${txtId}" required autocomplete="off"></div>
                    <div class="input_main">星期五</div>
                    <div class="input"><select name="fri${txtId}" id="time${txtId}4" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="fri${txtId}" required autocomplete="off"></div>
                    <div class="input_main">星期六</div>
                    <div class="input"><select name="sat${txtId}" id="time${txtId}5" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="sat${txtId}" required autocomplete="off"></div>
                    <div class="input_main">星期日</div>
                    <div class="input"><select name="sun${txtId}" id="time${txtId}6" required>
                            <option value="">開放時間</option>
                            <option value="24小時營業">24小時營業</option>
                            <option value="公休">公休</option>
                            <option value="自訂">自訂</option>
                        </select>　<input type="text" name="datetimes" id="sun${txtId}" required autocomplete="off"></div>
                </div>
            </div>`
        $("#showBlock").append(div);
        $("#del").attr("style", "display:inline-block")
        //時間外掛
        $('input[name="datetimes"]').daterangepicker({
            timePicker: true,
            timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
            timePicker24Hour: true,
            locale: {
                format: 'HH:mm'
            }
        });
        imgload()
        time()
    });
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

                            break;
                    }
                });
            }
        }
    }
    time()
    //remove 最新加入的input
    $("#del").click(function () {
        $(".place" + txtId).remove();
        txtId--
        imgload()
        time()
    })
    //時間外掛
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
        timePicker24Hour: true,
        locale: {
            format: 'HH:mm'
        }
    });
    //圖片上傳
    let filePath = [] //存取圖檔
    let img = [] //存取上傳網址
    function imgload() {
        for (i = 0; i <= txtId; i++) {
            $("#input-file" + i).change(function () {
                var imgname = this.name
                filePath[imgname] = this.files[0]
                $("#i" + imgname).html(`<span class= "spinner-border spinner-border-sl"></span>`)
                let fileRef = storageRef.child(`${$("#title").val().replace(/\//g, "\\")}/${filePath[imgname].name}`)
                fileRef.put(filePath[imgname])
                    .then(function (snapshot) {
                        $("#i" + imgname).html(`<i class="fa fa-image"></i><span class= "sptext">上傳成功</span>`)
                        return snapshot.ref.getDownloadURL()
                    }).then(function (downloadURL) {
                        $("#i" + imgname).html(`<i class="fa fa-image"></i><span class= "sptext">上傳成功</span>`)
                        img[imgname] = downloadURL
                    }).catch(function (error) {
                        $("#i" + imgname).html(`<i class="fa fa-image"></i><span class= "sptext">上傳失敗</span>`)
                    })
            })
        }
    }
    imgload()
});

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

function logout() {
	const auth = firebase.auth()
	auth.signOut()
	$("#email").val('')
	$("#password").val('')
	$("#sign-info").html("No one login...")
	window.location.href = "../index.html"
	loginuser = ""
}