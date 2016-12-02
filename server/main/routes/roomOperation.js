/**
 * Created by fortunato on 26/11/16.
 */
module.exports= roomOperation;
var roomObj = {};

function roomOperation(express_instance){

    var server = require('http').Server(express_instance);
    var io = require('socket.io')(server);
    io.listen(8082);

    express_instance.get('/getRoom', function (req, res) {
        res.send(roomObj);
    });

    io.on('connection', function (socket) {
        console.log(socket);
        socket.emit('news', { hello: 'world' });
        socket.on('joinRoom', function (data) {
            socket.join(data.room);
            console.log(data);
        });
    });

    function refresh_socket_io(){
    Object.keys(roomObj).map( key =>{
        io.to(roomObj.key).on('sendMessage', msg =>{
            roomObj.key.messages = roomObj.key.messages || [];
            roomObj.key.message.push({sender: msg.sender, message: msg.message});
            io.to(roomObj.key).emit(roomObj.key.messages);
        });
        io.to(roomObj.key).on('getMessage', msg => {
             io.to(msg.room).emit(roomObj.msg.room.messages || []);
        });
    });
    }

    setInterval(refresh_socket_io, 10000);

}