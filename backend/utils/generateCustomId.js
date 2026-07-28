import Counter from "../models/Counter.js";

async function getNextSequence(prefix) {
  const year = new Date().getFullYear().toString().slice(-2); // "26"
  const key = `${prefix}-${year}`;

  const counter = await Counter.findOneAndUpdate(
    { key },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  return counter.seq;
}

async function generateCustomId(prefix, padLength = 5) {
  const year = new Date().getFullYear().toString().slice(-2);
  const seq = await getNextSequence(prefix);
  return `${prefix}${year}${String(seq).padStart(padLength, "0")}`;
}

export default generateCustomId;