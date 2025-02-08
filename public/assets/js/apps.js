var cloak = localStorage.getItem("cloak");
if (!cloak) {
    document.title = "Home";
    localStorage.setItem("cloak");
} else {
    document.title = cloak;
}

if (cloak == "Home | Schoology") {
    document.getElementById('icon').setAttribute('href','https://logosandtypes.com/wp-content/uploads/2020/07/powerschool.svg');
} else {
    document.getElementById("icon").setAttribute("href","https://upload.wikimedia.org/wikipedia/commons/5/59/Google_Classroom_Logo.png");
}


fetch('/assets/json/apps.json')
    .then(response => response.json())
    .then(apps => {
        const appsContainer = document.querySelector('.apps');

        apps.forEach(app => {
            const appElement = document.createElement('div');
            appElement.className = 'app';

            appElement.innerHTML = `
        <img src="${app.image}" alt="${app.name}">
        <h3>${app.name}</h3>
      `;

            appElement.addEventListener('click', async () => {
                var ute = app.url;
                if (localStorage.getItem("proxy") == "uv") {
                    ute = __uv$config.prefix + __uv$config.encodeUrl(ute);
                    localStorage.setItem('url', ute);
                    window.location.href = '/browser';
                }
                else if (localStorage.getItem("proxy") == "sj") {
                    sjEncode();
                }
                else if (localStorage.getItem("proxy") == "rammerhead") {
                    rhEncode();
                }


                async function rhEncode() {
                    ute = await RammerheadEncode(ute);
                    window.location.href = "/" + ute;
                }
                async function sjEncode() {
                    ute = "/scram/service/" + encodeURIComponent(ute);
                    localStorage.setItem("url", ute);
                    window.location.href = "/browser";
                }
            });

            appsContainer.appendChild(appElement);
        });
    });

