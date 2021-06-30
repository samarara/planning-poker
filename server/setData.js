const { getFromStore, writeToStore, closeStore } = require("./clients/level");

const initialData = {
  0: {
    id: "0",
    label: "0 points",
    value: 0,
  },
  0.5: {
    id: "1/2",
    label: "1/2 points",
    value: 0,
  },
  1: {
    id: "1",
    label: "1 points",
    value: 0,
  },
  2: {
    id: "2",
    label: "2 points",
    value: 0,
  },
  3: {
    id: "3",
    label: "3 points",
    value: 0,
  },
  5: {
    id: "5",
    label: "5 points",
    value: 0,
  },
  8: {
    id: "8",
    label: "8 points",
    value: 0,
  },
  13: {
    id: "13",
    label: "13 points",
    value: 0,
  },
};

const getAdjustedVote = (existingVoteDatum, voteOrUnvote) => {
  if (voteOrUnvote === "unvote" && existingVoteDatum.value > 0) {
    const newValue = (existingVoteDatum.value -= 1);
    return { ...existingVoteDatum, value: newValue };
  }
  const newValue = (existingVoteDatum.value += 1);
  return { ...existingVoteDatum, value: newValue };
};

const reduceData = async (roomId, vote, category, question, dataStore) => {
  try {
    const roomData = await getFromStore(dataStore, roomId);
    const questionData = roomData[question];

    const newVoteDatum = getAdjustedVote(questionData[vote], category);
    const newQuestionData = { ...questionData, [vote]: newVoteDatum };
    console.log("existing data", roomData, "new data", newQuestionData);

    const newRoomData = { ...roomData, [question]: newQuestionData };

    await writeToStore(dataStore, roomId, newRoomData);
    await closeStore(dataStore);
    return Object.values(newQuestionData);
  } catch (err) {
    console.error("Unable to write data", err);
    await closeStore(dataStore);
  }
};

const addNewQuestion = async (roomId, question, dataStore) => {
  try {
    await writeToStore(dataStore, roomId, { [question]: initialData });
    const existingData = await getFromStore(dataStore, roomId);
    await closeStore(dataStore);
    console.log(existingData);
    return Object.values(initialData);
  } catch (err) {
    console.error("unable to add new question", err);
    await closeStore(dataStore);
  }
};

const getData = async (roomId, question, dataStore) => {
  try {
    const existingData = await getFromStore(dataStore, roomId);
    const questionData = existingData[question];
    return Object.values(questionData);
  } catch (err) {
    console.log("unable to get existing data", err);
    console.log("creating data");
    await addNewQuestion(dataStore, roomId);
    await closeStore(dataStore);
  }
};

const resetData = () => initialData;

module.exports = {
  initialData,
  reduceData,
  resetData,
  addNewQuestion,
  getData,
};
