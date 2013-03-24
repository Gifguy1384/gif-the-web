var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function show(images) {
    images.each(function() {
        var $this = $(this),
            url = $this.attr('href'),
            width = $this.parent().width(),
            img = $('<img />', {src:url });

        // add gif the web class to mark as done
        $this.addClass('gif-the-web');

        // create image
        img.css('width', width).css('height', 'auto');
        $this.html(img);
    });
}

var observer = new MutationObserver(function(mutations, observer) {
    var link = 'a[needshandler="needsHandler"]:not(.gif-the-web)',
        all = [
            // google images
            link + '[href*="gstatic.com/images?q"]',
            link + '[href$=".gif"]',
            link + '[href$=".png"]',
            link + '[href$=".jpg"]',
            link + '[href$=".jpeg"]'
        ],
        images = $(all.join(', '));
    if (images.length) {
        show(images);
    }
});

observer.observe(document, {
    subtree: true,
    attributes: true
});
