import { useState } from "react";
import { toast } from "react-hot-toast";
import { createReview } from "../../api/reviewApi";

const ReviewModal = ({ appointment, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!rating) {
      toast.error("Please give rating");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        appointmentId: appointment._id,
        doctorId: appointment.doctorId._id,
        rating,
        comment,
      });

      toast.success("Review submitted");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="bg-white rounded-2xl p-8 w-[600px] space-y-6 shadow-xl">

        <h2 className="text-xl font-semibold text-gray-800">
          Rate Your Experience
        </h2>

        {/* ⭐ STARS */}
        <div className="flex gap-2 text-4xl cursor-pointer">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              className={star <= rating ? "text-purple-600" : "text-gray-300"}
            >
              ★
            </span>
          ))}
        </div>

        {/* COMMENT */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full border rounded-lg p-4 text-sm h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReviewModal;