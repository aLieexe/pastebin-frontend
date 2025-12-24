docker build \
  --build-arg VITE_API_URL=http://backend:8080 \
  -t paste-frontend .
