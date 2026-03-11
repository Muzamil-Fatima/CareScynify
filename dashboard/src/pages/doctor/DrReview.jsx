import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Avatar,
  Chip
} from "@mui/material";

const reviews = [
  {
    id: 1,
    name: "Ali Khan",
    rating: 5,
    comment: "Very professional doctor. Explained everything clearly.",
    date: "12 Mar 2026"
  },
  {
    id: 2,
    name: "Sara Ahmed",
    rating: 4,
    comment: "Good experience. Clinic was well organized.",
    date: "10 Mar 2026"
  },
  {
    id: 3,
    name: "Ahmed Raza",
    rating: 3,
    comment: "Consultation was helpful but waiting time was long.",
    date: "8 Mar 2026"
  }
];

const DrReview = () => {
  const averageRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  return (
    <Box p={3}>
      {/* Page Header */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Patient Reviews
      </Typography>

      {/* Rating Summary */}
      <Card sx={{ mb: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h6">Overall Rating</Typography>

          <Box display="flex" alignItems="center" gap={2} mt={1}>
            <Rating value={averageRating} precision={0.5} readOnly />
            <Typography>{averageRating.toFixed(1)} / 5</Typography>
            <Chip label={`${reviews.length} Reviews`} />
          </Box>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid size={{ xs: 12, md: 6 }} key={review.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>

                {/* User Info */}
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Avatar>{review.name[0]}</Avatar>

                  <Box>
                    <Typography fontWeight="bold">
                      {review.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {review.date}
                    </Typography>
                  </Box>
                </Box>

                {/* Rating */}
                <Rating value={review.rating} readOnly />

                {/* Comment */}
                <Typography mt={2} color="text.secondary">
                  {review.comment}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DrReview;