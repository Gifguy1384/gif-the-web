var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function show(images) {
    images.each(function() {
        var $this = $(this),
            url = $this.attr('href'),
            width = $this.parent().width(),
            img = $('<img />', {src:url });

        // remove needshandler attribute so it doesn't get selected again
        $this.attr('needshandler', '');

        // create image
        img.css('width', width).css('height', 'auto');
        $this.html(img);
    });
}

var observer = new MutationObserver(function(mutations, observer) {
    var link = 'a[needshandler="needsHandler"]',
        gif = link + '[href$=".gif"]',
        png = link + '[href$=".png"]',
        jpg = link + '[href$=".jpg"]',
        jpeg = link + '[href$=".jpeg"]',
        all = [gif, png, jpg, jpeg],
        images = $(all.join(', '));
    if (images.length) {
        show(images);
    }
});

observer.observe(document, {
    subtree: true,
    attributes: true
});
