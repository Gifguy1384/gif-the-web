var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function show(image) {
    var $image = $(image),
        url = $image.attr('href'),
        width = $image.parent().width(),
        img = $('<img />', {src:url });
    // add gif the web class to mark as done
    $image.addClass('gif-the-web');

    // create image
    img.css('width', width).css('height', 'auto');
    $image.html(img);
}

var observer = new MutationObserver(function(mutations, observer) {
    var links = $('a[needshandler="needsHandler"]:not(.gif-the-web)');

    links.each(function() {
        var $this = $(this),
            url = $this.attr('href');
        $.ajax({
            url: url,
            type: 'HEAD'
        }).done(function(data, textStatus, jqXHR) {
            var type = jqXHR.getResponseHeader('Content-Type').toLowerCase();
            if (type.substring(0,6) === 'image/') {
                show($this);
            }
        });
    });
});

observer.observe(document, {
    subtree: true,
    attributes: true
});
