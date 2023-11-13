import Hapi, {ResponseToolkit, Server} from "@hapi/hapi";

let server: Server;
const init = async function (): Promise<Server> {
    server = Hapi.server({
        port: 43742,
        host: "localhost",
        routes:{
            cors:{
                credentials: true,
            }
        }
    });

    server.route({
        method: "GET",
        path: "/",
        handler: (request: Request, h: ResponseToolkit) => {
            return  'Hello, World!'
        }
    })

    return server;
};

const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    await server.start();
}

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init()
    .then(() => start()
        .catch(()=>console.log("Error starting server.")))
    .catch(() => console.log("Error init server."));