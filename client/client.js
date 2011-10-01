(function() {
    var sendMessage = function(room, message) {
    console.log(now.distributeMessage);
        now.distributeMessage(room, message);
    }

    now.recvMessage = function(room, nick, message) {
        var roomUi = $('#room-' + room + ' ul');
        if (!roomUi)
            return;

        roomUi.append('<li>' + nick + ': ' + message + '</li>');
    }

    var showRoomUi = function(name) {
        $('#main').children().hide();
        $('#room-' + name).show();
        $('#roomlist .active').removeClass('active');
        $('#act-' + name).addClass('active');
        $('#room-' + name + ' input').focus();
    }

    var createRoomUi = function(name) {
        var roomUi = '<div class="room" id="room-' + name + '"><h3>Room: ' + name + '</h3><ul></ul><input></input></div>';
        $('#main').append(roomUi);

        $('#room-' + name + ' input').keypress(function(evt) {
            if (evt.keyCode == 13) {
                sendMessage(name, $(this).val());
                $(this).val("");
            }
        });

        $('#roomlist').prepend('<li id="act-' + name + '">' + name + '</li>');
        $('#act-'+name).click(function() {
            showRoomUi(this.id.replace('act-', ''));
        });

        showRoomUi(name);
    }

    var createRoom = function(name) {
        now.joinRoom(name, function() {
            createRoomUi(name);
        });
    }

    var joinRoom = function() {
        var name = prompt('Room name?');
        if ($('#room-' + name).length == 0)
            createRoom(name);
        showRoomUi(name);
    }

    $(window).ready(function() {
        now.nick = prompt("Nickname?");
        $('#add-room').click(joinRoom);
    });
 })();
