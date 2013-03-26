var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function getParameterByName(url, name) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(url);
  if (results === null)
    return "";
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function animate(gifs, size) {
    gifs.each(function() {
        var $this = $(this),
            $parent = $this.parent(),
            src = $this.attr('src'),
            url = getParameterByName(src, 'url'),
            height = $parent.height(),
            width = $parent.width();
        $this.attr('src', url);

        // make gifs as big as possible :)
        if (size) {
            $this.css('max-width', size + 'px')
                 .css('max-height', size + 'px');

            if ($this.height() > $this.width()) {
                $this.css('width', 'auto /*fbexternal*/');
                $this.height(size);
            }
            else {
                $this.css('height', 'auto /*fbexternal*/');
                $this.width(size);
            }
        } else if (height || width) {
            $this.css('width', 'auto /*fbexternal*/')
                 .css('height', height + 'px /*fbexternal*/');
        }
    });
}

var observer = new MutationObserver(function(mutations, observer) {
    var commentGifs = $('.UFIComment a img[src*="safe_image.php"][src$=".gif"]');
    animate(commentGifs, 250);

    var safeImageGifs = $('a img[src*="safe_image.php"][src$=".gif"]');
    animate(safeImageGifs);

    var backgroundGifs = $('img.shareMediaPhoto').filter(function() {
        var image = $(this).css('background-image');
        return image.indexOf('.gif') > -1 && image.indexOf('safe_image.php') > -1;
    });
    backgroundGifs.each(function() {
        var $this = $(this),
            url = $(this).css('background-image');
        url = url.slice(4, url.length - 1);
        $this.css('background-image', '');
        $this.attr('src', url);
    });
    animate(backgroundGifs, 250);

    var newTimelineGifs = $('a.shareLink img').filter(function() {
        var image = $(this).css('background-image');
        return image.indexOf('.gif') > -1 && image.indexOf('safe_image.php') > -1;
    });

    newTimelineGifs.each(function() {
        var $this = $(this),
            url = $(this).css('background-image');
        url = url.slice(4, url.length - 1);
        $this.css('background-image', '');
        $this.attr('src', url);
    });
    animate(newTimelineGifs);
});

observer.observe(document, {
    subtree: true,
    attributes: true
});
