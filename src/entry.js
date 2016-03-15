const Session = require('./main');
const main = new Session();

main.init().then(function() {
    console.log(main.global, main.app);
})
.catch(function(err) {
    console.log(err);
})