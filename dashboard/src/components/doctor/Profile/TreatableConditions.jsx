import { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const TreatableConditions = ({ value = [], onChange }) => {
  const conditions = value || [];

  const MAX_TAGS = 4;
  const MAX_TAG_LENGTH = 30;
  const MAX_WORDS = 4;

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const addCondition = () => {
    const tag = input.trim();

    if (!tag) return;

    setError("");

    // Duplicate check
    if (
      conditions.some(
        (condition) => condition.toLowerCase() === tag.toLowerCase()
      )
    ) {
      setError("This condition has already been added.");
      return;
    }

    // Max tags
    if (conditions.length >= MAX_TAGS) {
      setError(`You can add up to ${MAX_TAGS} conditions only.`);
      return;
    }

    // Max characters
    if (tag.length > MAX_TAG_LENGTH) {
      setError(
        `A condition can contain up to ${MAX_TAG_LENGTH} characters.`
      );
      return;
    }

    // Max words
    if (tag.split(/\s+/).length > MAX_WORDS) {
      setError(`A condition can contain up to ${MAX_WORDS} words.`);
      return;
    }

    onChange([...conditions, tag]);
    setInput("");
    setError("");
  };

  const removeCondition = (condition) => {
    onChange(conditions.filter((item) => item !== condition));
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addCondition();
    }

    if (e.key === "Backspace" && !input && conditions.length > 0) {
      onChange(conditions.slice(0, -1));
    }
  };

  return (
    <div className="mt-4 mb-2 w-full max-w-2xl">
      <label className="mb-2 block font-medium text-gray-700">
        Treatable Conditions
      </label>

      <div className="mt-2 flex min-h-13 flex-wrap items-center gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 transition focus-within:border-purple-600 focus-within:ring-2 focus-within:ring-purple-100">
        {conditions.map((condition) => (
          <div
            key={condition}
            className="flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
          >
            <span>{condition}</span>

            <button
              type="button"
              onClick={() => removeCondition(condition)}
              className="rounded-full transition hover:bg-purple-200"
            >
              <CloseRoundedIcon sx={{ fontSize: 16 }} />
            </button>
          </div>
        ))}

        {conditions.length < MAX_TAGS && (
          <input
            type="text"
            value={input}
            maxLength={MAX_TAG_LENGTH + 10}
            onChange={(e) => {
              setInput(e.target.value);

              if (error) {
                setError("");
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              conditions.length === 0
                ? "Type a condition and press Enter"
                : ""
            }
            className="min-w-40 flex-1 border-none bg-transparent py-1 text-sm outline-none placeholder:text-gray-400"
          />
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-sm font-medium text-red-500">
          {error}
        </p>
      )}

      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {conditions.length}/{MAX_TAGS} Conditions Added
        </span>

        <span className="text-gray-400">
          {input.length}/{MAX_TAG_LENGTH}
        </span>
      </div>

      <p className="mt-1 text-xs text-gray-400">
        Add up to {MAX_TAGS} conditions. Each condition can contain a maximum of{" "}
        {MAX_WORDS} words and {MAX_TAG_LENGTH} characters.
      </p>
    </div>
  );
};

export default TreatableConditions;