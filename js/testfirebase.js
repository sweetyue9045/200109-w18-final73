var txtId = 0; //新增表單
$(document).ready(function () {
    // alert("進來了!!!");
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

    //送出表單
    $("#submit").click(function () {
        $("#submit").html(`<span class= "spinner-border spinner-border-sm"></span>`)
        console.log(places)
        place()
        submit()

        function submit() {
            if ($("#area").val() == "") {
                $("#submit").html(`送出`);
                eval("document.form['area'].focus()");
            } else if ($("#county").val() == "") {
                $("#submit").html(`送出`);
                eval("document.form['county'].focus()");
            } else if ($("#title").val() == "") {
                $("#submit").html(`送出`);
                eval("document.form['title'].focus()");
            } else if ($("#route").val() == "") {
                $("#submit").html(`送出`);
                eval("document.form['route'].focus()");
            } else if ($("#intro").val() == "") {
                $("#submit").html(`送出`);
                eval("document.form['intro'].focus()");
            } else {
                db.ref('/' + $("#area").val() + '/' + $("#title").val() + '/').set(
                    {
                        "title": $("#title").val(),
                        "route": $("#route").val(),
                        "intro": $("#intro").val(),
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
    var places = []; //存取多個地點
    function place() {
        for (i = 0; i <= txtId; i++) {
            if ($("#location" + i).val() == "") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['location+i'].focus()")
            } else if ($("#address" + i).val() == "") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['address'].focus()")
            } else if ($("#contents" + i).val() == "") {
                places = []
                $("#submit").html(`送出`);
                eval("document.form['contents'].focus()")
            } else {
                places.push({
                    "location": $("#location" + i).val(),
                    "address": $("#address" + i).val(),
                    "contents": $("#contents" + i).val(),
                    "time": [
                        { "week": $("#mon" + i).val() },
                        { "week": $("#tue" + i).val() },
                        { "week": $("#wed" + i).val() },
                        { "week": $("#thu" + i).val() },
                        { "week": $("#fri" + i).val() },
                        { "week": $("#sat" + i).val() },
                        { "week": $("#sun" + i).val() }
                    ]
                })
            }
        } console.log(places)

    }
    //渲染地點
    var route = firebase.database().ref().orderByKey();
    route.on("value", function (area) {
        area.forEach(function (myroute) {
            myroute.forEach(function (title) {
                var TData = title.val();
                $("#text_title").append(
                    `
                    route-title=${TData.title}
                    route-intro=${TData.intro}`
                )
                for (i = 0; i < TData.place.length; i++) {
                    $("#text_place").append(`
                        第${i + 1}個地點${TData.place[i].location}
                        地址${TData.place[i].address}`
                    )
                    if (i < TData.place.length - 1) {
                        $("#text_place").append(`
                        路線<a href="https://www.google.com/maps/dir/${TData.place[i].address}/${TData.place[i + 1].address}">路線</a>`
                        )
                    }
                    for (x = 0; x < 7; x++) {
                        var week = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期天"]
                        $("#text_time").append(
                            `${week[x]}：${TData.place[i].time[x].week}`
                        )
                    }
                }
            })
        });
    });
    //新增地點
    $("#btn").click(function () {
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
        </div>`
        $("#showBlock").append(div);
        $("#del").attr("style", "display:block")
        $('input[name="datetimes"]').daterangepicker({
            timePicker: true,
            timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
            timePicker24Hour: true,
            locale: {
                format: 'HH:mm'
            }
        });
    });
    //remove 最新加入的input
    $("#del").click(function () {
        $(".place" + txtId).remove();
        txtId--
    })
    $('input[name="datetimes"]').daterangepicker({
        timePicker: true,
        timePickerIncrement: 1, // 以 30 分鐘為一個選取單位
        timePicker24Hour: true,
        locale: {
            format: 'HH:mm'
        }
    });
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

