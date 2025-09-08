# => Development server
.PHONY: start-dev
start-dev: ## Start the staging docker container.
	docker compose -f ./compose.yml up --build -d

.PHONY: stop-dev
stop-dev: ## Stop the development docker container.
	docker compose -f ./compose.yml down
