//THIS FILE IS USED FOR DEVELOPMENT ONLY
require('./core/broadcaster/start')(() => {
    require('./core/server/start');
    require('./core/peer/start');
})

