import app from "./app";
const PORT = 9876;

app.listen(PORT, () => {
    console.log( `server started at http://localhost:${ PORT }` );
} );