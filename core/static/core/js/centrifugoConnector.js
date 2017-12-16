(function () {
    var data = document.querySelector('#centrifuge').dataset || {};
    var centrifuge = new Centrifuge({
        url: data.url,
        user: data.user,
        timestamp: data.timestamp,
        token: data.token,
    });

    centrifuge.subscribe("posts", function (message) {
        console.log(message);
    });

    centrifuge.connect();

})()


//todo: delete this file, not used