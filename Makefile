OUTPUT = ./dist

build: check clean
	npm run astro build
	./scripts/compress $(OUTPUT)
	nix build
	cp ./result/resume/sam-bossley.pdf $(OUTPUT)/sam-bossley.pdf

check:
	npm run lint
	npm run astro sync
	npm run astro check
	npm run typecheck

clean:
	rm -rf $(OUTPUT)/
	rm -rf ./resume.*

staging:
	npm run astro preview

server:
	npm run astro dev

review:
	./scripts/spellcheck

deploy: build
	rsync -av -e 'ssh' --chmod=775 --no-owner --no-group --no-times --delete "$(OUTPUT)/" "nixos@sam.bossley.us:/var/www/sam.bossley.us"
