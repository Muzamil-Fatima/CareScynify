import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Rating,
  Avatar,
  Chip,
} from "@mui/material";

import { getDoctorReviews } from "../api/reviewApi";

const DrReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getDoctorReviews();
      setReviews(data);
      setLoading(false);
    };

    fetchReviews();
  }, []);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length
      : 0;

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

      {/* Loading state */}
      {loading ? (
        <Typography>Loading reviews...</Typography>
      ) : (
        <Grid container spacing={3}>
          {reviews.map((review) => (
            <Grid size={{ xs: 12, md: 6 }} key={review._id}>
              <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                <CardContent>
                  {/* User Info */}
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar>{review.patient?.name?.[0] || "U"}</Avatar>

                    <Box>
                      <Typography fontWeight="bold">
                        {review.patient?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(review.createdAt).toDateString()}
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
      )}
    </Box>
  );
};

export default DrReview;
