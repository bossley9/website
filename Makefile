OUTPUT = ./public
OUTPUT_GEMINI = ./public_gemini

all: clean build

build:
	hugo --minify
	sed -i -e "s/&amp;/\&/g" $(OUTPUT)/feed.xml
	./scripts/errformat $(OUTPUT)
	./scripts/geminize $(OUTPUT) $(OUTPUT_GEMINI)
	./scripts/compress $(OUTPUT)

clean:
	rm -rf $(OUTPUT)/ $(OUTPUT_GEMINI)/ ./resources/

server:
	hugo server

.PHONY: all clean server
