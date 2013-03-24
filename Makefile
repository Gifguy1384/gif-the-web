PACKAGE = gif-the-web
VERSION = `sed -n 's/.*"version": "\(.*\)",/\1/p' manifest.json`
ARCHIVE = $(PACKAGE)-$(VERSION)

all: clean zip

clean:
	rm -f $(ARCHIVE).zip

zip:
	zip $(ARCHIVE).zip -r * -x *.zip Makefile
