
$(document).ready(function () {

    var client = new MaxanClient({ address: '192.168.0.104', port: 1337 });

    $(".user").css('display', 'block');

    $(".login").click(function () {

        var username = $("#username").val();

        console.log(username);

        if (username !== undefined) {

            $(".user").css("display", "none");

            client.sendAction("addUser", { user: username });

            $(".users").css("display", "block");

            $("#addCount").click(function () {
                
                client.sendAction("addCount");
                
            });

            while (true) {

                var users = client.sendAction("getUsers", {});

                $(".listusers").html("");

                for (var i = 0; i < users.length; i++) {
                    
                    var user = Object.getOwnPropertyNames(users)[i];

                    $(".listusers").html("<b>" + user + "</b> " + users[user]);

                }

            }

        } else {

            $(".empty").css("display", "block");

        }

    });

});
