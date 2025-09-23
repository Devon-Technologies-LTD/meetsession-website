.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f ./compose.yaml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f ./compose.yaml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f ./compose.yaml down

# .PHONY: build-production
# build-production: ## Build the production docker image.
# 	docker compose -f ./compose.prod.yaml build

# .PHONY: start-production
# start-production: ## Start the production docker container.
# 	docker compose -f ./compose.prod.yaml up --build -d


# => Development server
.PHONY: start-dev
start-dev: ## Start the staging docker container.
	docker compose -f ./compose.yaml up --build -d

.PHONY: stop-dev
stop-dev: ## Stop the development docker container.
	docker compose -f ./compose.yaml down


# => Development server
.PHONY: start-staging
start-staging: ## Start the staging docker container.
	docker compose -f ./compose.staging.yaml up --build -d

.PHONY: stop-staging
stop-staging: ## Stop the development docker container.
	docker compose -f ./compose.staging.yaml down


# => Preproduction server
.PHONY: start-preprod
start-preprod: ## Start the preproduction docker container.
	docker compose -f ./compose.preprod.yaml up --build -d

.PHONY: stop-preprod
stop-preprod: ## Stop the preproduction docker container.
	docker compose -f ./compose.preprod.yaml down


# => Production server
.PHONY: start-prod
start-prod: ## Start the production docker container.
	docker compose -f ./compose.prod.yaml up --build -d

.PHONY: stop-prod
stop-prod: ## Stop the production docker container.
	docker compose -f ./compose.prod.yaml down
