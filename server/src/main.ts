import Hapi, {Server} from "@hapi/hapi";
import Inert from "@hapi/inert";
import Path from "path";

let server: Server;
const init = async function (): Promise<Server> {
    server = Hapi.server({
        port: 43742,
        host: "localhost",
        routes: {
            cors: {
                credentials: true,
            }
        }
    });

    await server.register(Inert);

    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../client/dist/'),
                listing: false,
                index: true
            }
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