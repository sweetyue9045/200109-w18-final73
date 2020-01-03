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
    //送出表單
    $("#submit").click(function () {
        $("#submit").html(`<span class= "spinner-border spinner-border-sm"></span>`)
        place()
        submit()
        function submit() {
            if ($("#area").val().replace(/\s+/g, "") == "") {
                $("#submit").html(`送出`);
                eval("document.form['area'].focus()");
            } else if ($("#county").val().replace(/\s+/g, "") == "") {
                $("#submit").html(`送出`);
                eval("document.form['county'].focus()");
            } else if ($("#title").val().replace(/\s+/g, "") == "") {
                $("#submit").html(`送出`);
                eval("document.form['title'].focus()");
            } else if ($("#route").val().replace(/\s+/g, "") == "") {
                $("#submit").html(`送出`);
                eval("document.form['route'].focus()");
            } else if ($("#intro").val().replace(/\s+/g, "") == "") {
                $("#submit").html(`送出`);
                eval("document.form['intro'].focus()");
            } else {
                db.ref('/' + $("#area").val() + '/' + $("#title").val().replace(/\//g, "\\") + '/').set(
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
    })
    //選擇地點
    $("#area").change(function () {
        switch ($(this).val()) {
            default:
            case "":
                $("#county option").remove();
                var array = ["-請選擇-"];
                $.each(array, function (i, val) {
                    $("#county").append($("<option value=''>" + array[i] + "</option>"));
                });
                break;
            case "northern":
                $("#county option").remove();
                var array = ["-請選擇-", "台北", "新北", "基隆", "宜蘭", "桃園", "新竹"];
                $.each(array, function (i, val) {
                    if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
                    else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
                });
                break;
            case "central":
                $("#county option").remove();
                var array = ["-請選擇-", "苗栗", "台中", "彰化", "南投", "雲林"];
                $.each(array, function (i, val) {
                    if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
                    else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
                });
                break;
            case "southern":
                $("#county option").remove();
                var array = ["-請選擇-", "嘉義", "台南", "高雄", "屏東"];
                $.each(array, function (i, val) {
                    if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
                    else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
                });
                break;
            case "eastern":
                $("#county option").remove();
                var array = ["-請選擇-", "花蓮", "台東"];
                $.each(array, function (i, val) {
                    if (i == 0) $("#county").append($("<option value=''>" + array[i] + "</option>"));
                    else $("#county").append($("<option value='" + array[i] + "'>" + array[i] + "</option>"));
                });
                break;
            case "islands":
                $("#county option").remove();
                var array = ["-請選擇-", "澎湖", "金門", " 馬祖"];
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
                $("#submit").html(`送出`);
                eval("document.form['location+i'].focus()")
            } else if ($("#address" + i).val().replace(/\s+/g, "") == "") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['address'].focus()")
            } else if ($("#contents" + i).val().replace(/\s+/g, "") == "") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['contents'].focus()")
            } else if ($('#input-file'+ i).val()=="") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['input-file'].focus()")
            } else if (img[i]=="") {
                places = []
                $("#submit").html(`送出`);
                eval(function(){
                    eval("document.form['btnUpload'].focus()")
                    alert("未成功上傳")})
            }else {
                places.push({
                    "location": $("#location" + i).val(),
                    "address": $("#address" + i).val(),
                    "contents": $("#contents" + i).val().replace(/\r\n|\n/g, "</br>"),
                    "time": [
                        { "week": $("#mon" + i).val() },
                        { "week": $("#tue" + i).val() },
                        { "week": $("#wed" + i).val() },
                        { "week": $("#thu" + i).val() },
                        { "week": $("#fri" + i).val() },
                        { "week": $("#sat" + i).val() },
                        { "week": $("#sun" + i).val() }
                    ],
                    "img": img[i]
                })
            }
        }
    }
    //新增地點
    $("#addItem").click(function () {
        txtId++;
        let div = `<div class="place${txtId}">
        第 ${txtId + 1} 站<br>
            地名：<input type="text" class="location" id="location${txtId}" autocomplete="off" required><br>
            地址：<input type="text" class="address" id="address${txtId}" autocomplete="off" required><br>
            介紹：<br><textarea type="text" class="contents" id="contents${txtId}" autocomplete="off" required></textarea><br>
            開放時間：<br>
            星期一：<input type="text" name="datetimes" id="mon${txtId}" required><br>
            星期二：<input type="text" name="datetimes" id="tue${txtId}" required><br>
            星期三：<input type="text" name="datetimes" id="wed${txtId}" required><br>
            星期四：<input type="text" name="datetimes" id="thu${txtId}" required><br>
            星期五：<input type="text" name="datetimes" id="fri${txtId}" required><br>
            星期六：<input type="text" name="datetimes" id="sat${txtId}" required><br>
            星期天：<input type="text" name="datetimes" id="sun${txtId}" required><br>
            <label class="btn btn-info">
                <input class="input-file" type="file" id="input-file${txtId}" name="${txtId}" accept="image/*" required />
                <i class="fa fa-photo" id="i${txtId}"> 選擇圖片</i>
            </label>
        </div>`
        $("#showBlock").append(div);
        $("#del").attr("style", "display:block")
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
    });
    //remove 最新加入的input
    $("#del").click(function () {
        $(".place" + txtId).remove();
        txtId--
        imgload()
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
            console.log(i)
            $("#input-file" + i).change(function () {
                var imgname = this.name
                filePath[imgname] = this.files[0]
                $("#i" + imgname).html(`<span class= "spinner-border spinner-border-ss"></span>`)
                let fileRef = storageRef.child(`${$("#title").val().replace(/\//g, "\\")}/${filePath[imgname].name}`)
                fileRef.put(filePath[imgname])
                    .then(function (snapshot) {
                        $("#i" + imgname).html(`<span class= "sptext">上傳成功</span>`)
                        return snapshot.ref.getDownloadURL()
                    }).then(function (downloadURL) {
                        $("#i" + imgname).html(`<span class= "sptext">上傳成功</span>`)
                        img[imgname] = downloadURL
                        console.log(img)
                    }).catch(function (error) {
                        $("#i" + imgname).html(`<span class= "sptext">上傳失敗</span>`)
                        console.log(`failed`)
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

