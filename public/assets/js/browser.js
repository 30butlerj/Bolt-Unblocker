var cloak = localStorage.getItem("cloak");

if (!cloak || cloak == "undefined") {
    document.title = "Home";
    localStorage.setItem("cloak", "Google Classroom");
    cloak = "Google Classroom";
} else {
    if (cloak == "Schoology") {
        document.title = "Home | Schoology";
    } else if (cloak == "Google Classroom") {
        document.title = "Home";
    } else {
        document.title = "Home";
        localStorage.setItem("cloak", "Google Classroom");
        cloak = "Google Classroom";
    }
}

if (cloak == "Schoology") {
    document.getElementById('icon').setAttribute('href','https://logosandtypes.com/wp-content/uploads/2020/07/powerschool.svg');
} else {
    document.getElementById("icon").setAttribute("href","https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png");
}

async function init() {
    try {
        const connection = new BareMux.BareMuxConnection("/baremux/worker.js");
        const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
        if (localStorage.getItem("transport") == "epoxy") {
            if (await connection.getTransport() !== "/epoxy/index.mjs") {
                await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }
        else {
            if (await connection.getTransport() !== "/libcurl/index.mjs") {
                await connection.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
                console.log("Using websocket transport. Wisp URL is: " + wispUrl);
            }
        }

    } catch (err) {
        console.error("An error occurred while setting up baremux:", err);
    }
    document.getElementById("frame").src = localStorage.getItem("url");
}

init().then(() => {
});

var reload = document.getElementById("reload");
reload.addEventListener("click", function () {
    document.getElementById("frame").contentWindow.location.reload();
});

var oin = document.getElementById("oin");
oin.addEventListener("click", function () {
    window.open(document.getElementById("frame").src);
});

var home = document.getElementById("ghome");
home.addEventListener("click", function () {
    window.location.href = "/";

});

var py = document.getElementById("py");
py.addEventListener("click", function () {
    if (localStorage.getItem("proxy") == "uv") {

        localStorage.setItem("currenturl", (__uv$config.decodeUrl(document.getElementById("frame").src.replace(window.location.origin, "").substring(12))));
        localStorage.setItem("url", "/scram/service/" + encodeURIComponent(localStorage.getItem("currenturl")));
    }
    else if (localStorage.getItem("proxy") == "sj") {
        localStorage.setItem("currenturl", decodeURIComponent(document.getElementById("frame").src).replace(window.location.origin, "").substring(15));
        localStorage.setItem("url", __uv$config.prefix + __uv$config.encodeUrl(localStorage.getItem("currenturl")));
    }
    localStorage.setItem("proxy", localStorage.getItem("proxy") == "uv" ? "sj" : "uv");
    alert("Proxy set to " + localStorage.getItem("proxy"));
    window.location.reload();


});
