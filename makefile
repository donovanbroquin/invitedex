.PHONY: compose
compose:
	docker compose -f compose.local.yml pull
	docker compose -f compose.local.yml down
	docker compose -f compose.local.yml up --build -d