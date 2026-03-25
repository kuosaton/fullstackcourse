FROM node:24-alpine AS build-stage

WORKDIR /frontend

COPY frontend/package.json frontend/package-lock.json ./

RUN <<EOF
  if [ -f package-lock.json ]; then npm ci;
  else npm i;
  fi
EOF

COPY frontend ./

RUN npm run build

FROM node:24-alpine AS production-stage

WORKDIR /backend

COPY --from=build-stage /frontend/dist ./dist

COPY backend/package.json backend/package-lock.json ./

RUN <<EOF
  if [ -f package-lock.json ]; then npm ci --omit=dev;
  else npm i --omit=dev;
  fi
EOF

COPY backend ./

EXPOSE 3001

CMD ["node", "index.js"]