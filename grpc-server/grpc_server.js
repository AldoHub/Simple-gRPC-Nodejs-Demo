
var PROTO_PATH = './proto/demo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

/*
-- DB CONNECTION --
const mysqlConnection = require('./mysql_connection');
*/

/**
 * Implements the SayHello RPC method.
 */
function AddCase(call, callback) {
  //---- You can insert data into a db here ---

  //just a simple callback message
  callback(null, {message: "gRPC Server Message -- Data received and inserted in db"});
}


function ListCases(call, callback) {
  //---- You can return data from the db here ---
  //---- data needs to be returnes as stream as well ---

  //just a simple callback message
  callback(null, {message: "gRPC Server Message --Sending cases data"});
}


/**
 * Starts an RPC server that receives requests for the Cases service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(demo_proto.Cases.service, {
    AddCase: AddCase,
    ListCases: ListCases
  });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("gRPC Server on port 50051")
  });
}

main();
