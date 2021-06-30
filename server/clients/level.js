const level = require("level-mem");

const createStore = async (name) => {
  return await level(name, {
    createIfMissing: true,
    valueEncoding: "json",
    keyEncoding: "utf8",
  });
};

const writeToStore = async (store, key, data) => {
  await store.open();
  await store.put(key, data);
  await store.close();
  return "updated";
};

const getFromStore = async (store, key) => {
  await store.open();
  const results = await store.get(key);
  await store.close();
  return results;
};

const closeStore = async (store) => {
  await store.close();
};

module.exports = {
  createStore,
  writeToStore,
  getFromStore,
  closeStore,
};
