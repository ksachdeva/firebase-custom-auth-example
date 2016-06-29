const restify = require('restify');
const firebase = require('firebase');
const _ = require('lodash');

const app = restify.createServer();
app.use(restify.acceptParser(app.acceptable));
app.use(restify.authorizationParser());
app.use(restify.dateParser());
app.use(restify.queryParser());
app.use(restify.jsonp());
app.use(restify.gzipResponse());
app.use(restify.bodyParser());
app.use(restify.CORS());

// we will just create one end point
// where the user will submit his username password

const FB_DB_URL = 'https://open-source-experiments.firebaseio.com/';
const SERVICE_ACCOUNT_FILE = 'fb_credentials.json';

// this make sure that we are authenticated to
// the account
const fbAppRef = firebase.initializeApp({
    serviceAccount: SERVICE_ACCOUNT_FILE,
    databaseURL: FB_DB_URL
});

// pre-created accounts (in real life they will be in some database)
const account1 = {
    name: 'Kapil Sachdeva',
    username: 'ksachdeva@someemail.com',
    password: 'password1',
    uuid: '596677b3-b6e6-4405-80ae-4c75928df132'
};

const account2 = {
    name: 'Bharat Sachdeva',
    username: 'bsachdeva@someemail.com',
    password: 'password2',
    uuid: '372313db-6f3e-4da4-aa68-5596f2cf0067'
};

const dbAccounts = [account1, account2];

app.post('/login', (req, res, next) => {

    const username = req.body.username;
    const password = req.body.password;

    // finding which account will match the
    // supplied credentials
    const accounts = _.filter(dbAccounts, {
        username: username,
        password: password
    });

    if (accounts === undefined || accounts === null || accounts.length === 0) {
        res.send(400);
        return next();
    }

    // should be the only one in the array
    const theAccount = accounts[0];

    // finally we are using firebase to generate the custom token
    const fbAppAuth = fbAppRef.auth();
    const token = fbAppAuth.createCustomToken(theAccount.uuid, {
        name: theAccount.name
    });

    res.send({
        token
    });

});

app.listen(8080, () => console.log('Listening ...'));
