const AIExplanation = ({ explanation }) => {
  return (
    <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">
        AI Summary
      </h2>

      {explanation ? (
        <div className="text-gray-700 whitespace-pre-line leading-7">
          {explanation}
        </div>
      ) : (
        <div className="text-gray-500">
          No AI explanation available yet.
        </div>
      )}
    </div>
  );
};

export default AIExplanation;