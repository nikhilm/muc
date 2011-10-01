(function() {
    var sendMessage = function(room, message) {
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

    var destroyRoomUi = function(name) {
        $('#main').children().hide();
        $('#room-' + name).remove();
        $('#act-' + name).remove();

        if ($('#roomlist li').length > 1)
            showRoomUi($('#roomlist li')[0].id.replace('act-', ''));
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

        $('#roomlist').prepend('<li id="act-' + name + '">' + name + '<a href="#" id="leave-' + name + '">(leave)</a></li>');
        $('#act-'+name).click(function() {
            showRoomUi(this.id.replace('act-', ''));
        });

        $('#leave-'+name).click(function() {
            var self = this;
            now.leaveRoom(name, function() {
                destroyRoomUi(self.id.replace('leave-', ''));
            });
            return false;
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
