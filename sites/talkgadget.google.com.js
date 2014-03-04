var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
var _ = window._ || {};

function show(image) {
    var $image = $(image),
        url = $image.attr('href'),
        width = $image.parent().width(),
        img = $('<img />', {src:url });

    // create image
    img.css('width', width).css('height', 'auto');
    $image.html(img);
}

var findImages = function () {
    var links = $('a.Xx:not(.gif-the-web)');

    links.each(function() {
        var $this = $(this),
            googleURL = $this.attr('href'),
            parsedURL = new URI(googleURL).search(true).q;
        // add gif the web class to mark as done
        $this.addClass('gif-the-web');

        $.ajax({
            url: parsedURL,
            type: 'HEAD'
        }).done(function(data, textStatus, jqXHR) {
            var header,
                type;
            header = jqXHR.getResponseHeader('Content-Type');
            if (header) {
                type = header.toLowerCase();
            }
            if (type && type.substring(0,6) === 'image/') {
                $this.attr('href', parsedURL);
                show($this);
            }
        });
    });
};

if (_.throttle) {
  findImages = _.throttle(findImages, 1000);
}

var observer = new MutationObserver(findImages);

observer.observe(document, {
    subtree: true,
    attributes: true
});
