FROM library/node

WORKDIR /tmp
ADD package.json index.js ./
RUN npm install

ENTRYPOINT ["node", "."]