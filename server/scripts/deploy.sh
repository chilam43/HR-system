set -e

docker tag 'hr-system:latest' leslie821/hr-system:latest
docker push leslie821/hr-system:latest

ssh hr "
docker pull leslie821/hr-system:latest && \
docker-compose up -d
"