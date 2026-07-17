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

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // resolve('This is executed after 3 seconds');
        reject({code: 500, message: 'An error occurred'});
        // console.log('This is executed after 3 seconds');
    }, 3000);
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin.io/ip');
xhr.responseType = 'json';
xhr.onload = function() {
    console.log(xhr.response);
};
xhr.onerror = function() {
    console.log('Error', xhr.response);
};
xhr.send();

fetch('https://httpbin.io/ip')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });

fetch('https://httpbin.io/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ message: 'Does this work?' })
})
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });

promise.then(function(text) {
    return text;
}).then(function(newText) {
    console.log(newText);
}).catch(function(err) {
    console.log(err.code, err.message);
});

console.log('This is executed right after SetTimeout');