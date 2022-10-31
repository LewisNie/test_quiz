import express from "express";
import creators from "../../../data/quiz3.json";

const router = express.Router();

let quiz3Creators = creators;

const TAGS = [
  "mom",
  "baby",
  "child",
  "teenager",
  "adult",
  "senior",
  "model",
  "teacher",
  "actor",
  "actress",
  "singer",
  "musician",
  "painter",
];
const quiz4Influencers = [];
const quizTagsMap = new Map();
for (let i = 0; i < 10000000; i++) {
  const randomTagIndex = Math.floor(Math.random() * TAGS.length);
  const influencer = {
    id: i,
    name: `name-${i}`,
    tag: TAGS[randomTagIndex],
  };
  if (!quizTagsMap.has(TAGS[randomTagIndex])) {
    quizTagsMap.set(TAGS[randomTagIndex], [influencer]);
  }
  quizTagsMap.get(TAGS[randomTagIndex]).push(influencer);
  quiz4Influencers.push(influencer);
}

router.route("/getQuiz3Creators").get((req, res) => {
  res.status(200).send(quiz3Creators);
});

router.route("/addNewQuiz3Creators").post((req, res) => {
  const { body } = req;
  const { newCreator } = body || {};
  /* Quiz #3 - 3. Handle the POST request sent from the client */
  /* Your code goes here */
  quiz3Creators.push(newCreator);
  // we may check if save error we send error message and roll back in the frontend
  res.status(200).send("ok");
});

router.route("/queryQuiz4CreatorsBaseline").get((req, res) => {
  const { query } = req;
  const { tag } = query || {};

  const start = new Date().getTime();

  const results = quiz4Influencers.filter(
    (influencer) => influencer.tag === tag
  );

  const elapsed = new Date().getTime() - start;

  res.status(200).send({
    results,
    cost: `${elapsed}ms`,
  });
});

router.route("/queryQuiz4Creators").get((req, res) => {
  const { query } = req;
  const { tag } = query || {};

  const start = new Date().getTime();

  /* Quiz #4 - Optimized the lookup */
  const results = quizTagsMap.get(tag);

  const elapsed = new Date().getTime() - start;
  res.status(200).send({
    results,
    cost: `${elapsed}ms`,
  });
});

// This is an example of how to handle a POST request
router.route("/postExample").post((req, res) => {
  const { body } = req;
  const { params } = body || {};
  res.status(200).send("ok");
});

export default router;
