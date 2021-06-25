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

const getAdjustedVote = (existingVoteDatum, voteOrUnvote) => {
  if (voteOrUnvote === "unvote") {
    const newValue = (existingVoteDatum.value -= 1);
    return { ...existingVoteDatum, value: newValue };
  }
  const newValue = (existingVoteDatum.value += 1);
  return { ...existingVoteDatum, value: newValue };
};

const reduceData = async (
  roomId,
  vote,
  category,
  // newVote,
  // previousVote,
  question,
  dataStore
) => {
  try {
    const roomData = await getFromStore(dataStore, roomId);
    // console.log("existing data", roomData);
    const questionData = roomData[question];

    // const existingVoteDatum = questionData[newVote];
    // const newValue = (existingVoteDatum.value += 1);
    // const newVoteDatum = { ...existingVoteDatum, value: newValue };

    // const existingPreviousVoteDatum = questionData[previousVote];
    // const previousValue = (previousVote.value -= 1);
    // const previousVoteDatum = {
    //   ...existingPreviousVoteDatum,
    //   value: previousValue,
    // };

    const newVoteDatum = getAdjustedVote(questionData[vote], category);
    const newQuestionData = { ...questionData, [vote]: newVoteDatum };
    console.log("existing data", roomData, "new data", newQuestionData);

    // const newQuestionData = {
    //   ...questionData,
    //   [newVote]: newVoteDatum,
    //   [previousVote]: previousVoteDatum,
    // };

    const newRoomData = { ...roomData, [question]: newQuestionData };
    // console.log("new data in reducer", newRoomData);
    // console.log("new question data", newQuestionData);
    await writeToStore(dataStore, roomId, newRoomData);
    await closeStore(dataStore);
    return Object.values(newQuestionData);
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

const jsonfiyData = (data) => JSON.stringify(data);

const resetData = () => initialData;

module.exports = {
  initialData,
  reduceData,
  resetData,
  addNewQuestion,
  getData,
};
