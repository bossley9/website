OUTPUT = ./public

build: clean
	hugo --minify --cleanDestinationDir
	sed -i -e "s/&amp;/\&/g" $(OUTPUT)/feed.xml
	./scripts/compress $(OUTPUT)

clean:
	rm -rf $(OUTPUT)/ ./resources/ .hugo_build.lock

server:
	hugo server

review:
	./scripts/spellcheck

deploy: build
	rsync -av -e 'ssh' --chmod=775 --no-owner --no-group --no-times --delete "./public/" "nixos@sam.bossley.us:/var/www/sam.bossley.us"
