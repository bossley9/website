OUTPUT = ./dist

build: check clean
	deno task build
	nix build
	cp -r ./result/* $(OUTPUT)
	./scripts/compress.sh $(OUTPUT)

check:
	deno lint
	npm run astro sync
	npm run astro check
	npm run typecheck

clean:
	chmod -Rv 777 $(OUTPUT)/
	rm -rf $(OUTPUT)/
	rm -f result

server:
	npm run astro dev

review:
	./scripts/spellcheck.sh

deploy: build
	rsync -av -e 'ssh -p 24' --chmod=775 --no-owner --no-group --no-times --delete "$(OUTPUT)/" "admin@sam.bossley.xyz:/var/www/sam.bossley.xyz"

.PHONY: server
