import Hapi, {Server} from "@hapi/hapi";
import Inert from "@hapi/inert";
import Jwt from "@hapi/jwt";

let server: Server;
const init = async function (): Promise<Server> {
    server = Hapi.server({
        port: process.env.SERVER_PORT || 4000,
        routes: {
            cors: {
                credentials: true,
            }
        }
    });

    await server.register(Inert);
    await server.register(Jwt);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    return server;
};

const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    await server.start();
}

process.on('unhandledRejection', (err): void => {

    console.log(err);
    process.exit(1);
});

init().then(() => start());