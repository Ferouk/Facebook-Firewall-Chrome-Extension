 chrome.browserAction.setBadgeBackgroundColor({
    "color" :  "#f44336"
    })
chrome.browserAction.setBadgeText({"text":"0"})
 function badge_count(){
    old = 0;
    chrome.browserAction.getBadgeText({}, function(result){
        old = parseInt(result);
        chrome.browserAction.setBadgeText({
            "text": old+1+""
        });
    });
}
 

chrome.storage.sync.get("facebookFirewall", function(obj){
    var data = obj.facebookFirewall;

    var seen = data.seen;
    var writing = data.writing;
    var lastseen = data.lastseen;
    var commenting = data.commenting;

if(seen){
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
            badge_count();
    return {
        cancel: seen
    }
    }, { urls: ['*://*.facebook.com/*change_read_status*'] }, ['blocking'])
}

if(writing){
chrome.webRequest.onBeforeRequest.addListener(function(details) {
         badge_count();
  return {
    cancel: writing
  }
}, { urls: ['*://*.facebook.com/*typ.php*'] }, ['blocking'])
}

if(lastseen){
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        badge_count();
    return {
        cancel: lastseen
    }
    }, { urls: ['*://*.facebook.com/pull*'] }, ['blocking'])
}

if(commenting){
    chrome.webRequest.onBeforeRequest.addListener(function(details) {
        badge_count();
        console.log(commenting)
    return {
        cancel: commenting
    }
    }, { urls: ['*://*.facebook.com/ufi/typing/*'] }, ['blocking'])
}

});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    location.reload();
});