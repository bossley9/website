OUTPUT = ./dist

build: check clean
	npm run astro build
	nix build
	cp -r ./result/* $(OUTPUT)
	./scripts/compress.sh $(OUTPUT)

check:
	npm run lint
	npm run astro sync
	npm run astro check
	npm run typecheck

clean:
	chmod -Rv 777 $(OUTPUT)/
	rm -rf $(OUTPUT)/
	rm -f result

staging:
	npm run astro preview

server:
	npm run astro dev

review:
	./scripts/spellcheck.sh

deploy: build
	rsync -av -e 'ssh -p 24' --chmod=775 --no-owner --no-group --no-times --delete "$(OUTPUT)/" "nixos@sam.bossley.us:/var/www/sam.bossley.us"

.PHONY: server
