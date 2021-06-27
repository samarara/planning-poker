FROM node:12-slim AS build

COPY . .

RUN npm install
RUN npm run build

FROM build AS release

COPY --from=build ./server .
COPY --from=build ./client/build ./public

ENV PORT=${PORT}
EXPOSE ${PORT}

ENTRYPOINT [ "npm", "start" ]
