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

const doesKeyExist = async (store, key) => {
  await store.open();
  try {
    await store.get(key);
    return true;
  } catch (err) {
    if (
      err.type === "NotFoundError" &&
      err.message.includes("Key not found in database")
    ) {
      return false;
    } else {
      throw err;
    }
  } finally {
    store.close();
  }
};

const closeStore = async (store) => {
  await store.close();
};

module.exports = {
  createStore,
  writeToStore,
  getFromStore,
  doesKeyExist,
  closeStore,
};
