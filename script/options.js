$(function () {
    $.material.init();

    function save_options(){
        var seen = $("input#seen")[0].checked;
        var lastseen = $("input#lastseen")[0].checked;
        var writing = $("input#writing")[0].checked;
        var commenting = $("input#commenting")[0].checked;
        
        chrome.storage.sync.set({
            facebookFirewall: { 
                seen: seen,
                lastseen: lastseen,
                writing:writing,
                commenting: commenting
            }
        }, function() {
            // Update status to let user know options were saved.
            chrome.extension.sendRequest({msg:"update"}, function(response) {
            var msg = $(".alert");
                msg.fadeIn();
                setTimeout(function() {
                    msg.fadeOut();
                }, 2000);
            });

        });

    }

    function restore_options() {
        // Use default value color = 'red' and likesColor = true.
        chrome.storage.sync.get({
            facebookFirewall: { 
                seen: false,
                lastseen: false,
                writing:false,
                commenting:false
            }
        }, function(items) {
            $("input#seen")[0].checked = items.facebookFirewall.seen;
            $("input#lastseen")[0].checked = items.facebookFirewall.lastseen;
            $("input#writing")[0].checked = items.facebookFirewall.writing;
            $("input#commenting")[0].checked = items.facebookFirewall.commenting;
        });
    }

    restore_options();

    $("button#save").click(function(e){
        e.preventDefault();
        save_options();
    });

    $("a#navLink").click(function(e){
        var myClass = $(this).attr("class");
        
        if(myClass == "optionsLink" && !$('.options-page').is(":visible")){
            $('.about-page').fadeOut();
            $('.contact-page').fadeOut();
            $('.options-page').fadeIn();
        }else if(myClass == "aboutLink" && !$('.about-page').is(":visible")){
            $('.options-page').fadeOut();
            $('.contact-page').fadeOut();
            $('.about-page').fadeIn();

        }else if(myClass == "contactLink" && !$('.contact-page').is(":visible")){
            $('.options-page').fadeOut();
            $('.about-page').fadeOut();
            $('.contact-page').fadeIn();
        }else{
            return;
        }

        $("a#navLink").parent().removeClass("active");
        $(this).parent().addClass("active");

        
    })

});
