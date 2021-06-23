const { getFromStore, writeToStore, closeStore } = require("./clients/level");

const initialData = {
  0: {
    id: "0",
    label: "0",
    value: 0,
  },
  0.5: {
    id: "1/2",
    label: "1/2",
    value: 0,
  },
  1: {
    id: "1",
    label: "1",
    value: 0,
  },
  2: {
    id: "2",
    label: "2",
    value: 0,
  },
  3: {
    id: "3",
    label: "3",
    value: 0,
  },
  5: {
    id: "5",
    label: "5",
    value: 0,
  },
  8: {
    id: "8",
    label: "8",
    value: 0,
  },
  13: {
    id: "13",
    label: "13",
    value: 0,
  },
};

const reduceData = async (newVote, question, dataStore) => {
  try {
    const existingData = await getFromStore(dataStore, question);
    console.log("existing data", existingData);
    const existingDatum = existingData[newVote];
    const newValue = (existingDatum.value += 1);
    const newDatum = { ...existingDatum, value: newValue };
    console.log("existing data", existingData, newValue, newDatum);
    const newData = { ...existingData, [newVote]: newDatum };
    await writeToStore(dataStore, question, newData);
    await closeStore(dataStore);
    return Object.values(newData);
  } catch (err) {
    console.error("Unable to write data", err);
    await closeStore(dataStore);
  }
  // const newData = await getFromStore(question)ff
  //   .filter((datum) => datum.id === newVote)
  //   .map((datum) => {
  //     const newValue = (datum.value += 1);
  //     return { ...datum, value: newValue };
  //   });
  // console.log("server", [...data, ...newData]);
  // return Array.from(new Set([...data, ...newData]));
};

const addNewQuestion = async (dataStore, question) => {
  try {
    await writeToStore(dataStore, question, initialData);
    const existingData = await getFromStore(dataStore, question);
    await closeStore(dataStore);
    console.log(existingData);
    return Object.values(initialData);
  } catch (err) {
    console.error("unable to add new question", err);
    await closeStore(dataStore);
  }
};

const getData = async (dataStore, question) => {
  try {
    const existingData = await getFromStore(dataStore, question);
    return Object.values(existingData);
  } catch (err) {
    console.log("unable to get existing data", err);
    console.log("creating data");
    await addNewQuestion(dataStore, question);
    await closeStore(dataStore);
  }
};

const jsonfiyData = (data) => JSON.stringify(data);

const resetData = () => initialData;

module.exports = {
  initialData,
  reduceData,
  resetData,
  addNewQuestion,
  getData,
};
