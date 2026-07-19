var deferredPrompt; 

if(!window.Promise) {
    window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('../../sw.js')
        .then(function() {
            console.log('Service Worker Registered');
        })
        .catch(function(err) {
            console.log('Service Worker registration failed: ', err);
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt Event fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});