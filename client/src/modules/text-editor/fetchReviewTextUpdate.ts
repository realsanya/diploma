import API from 'api';

const fetchReviewTextUpdate = async (review: TReview, token: string, text: any) => {
  try {
    await fetch(`${API.REVIEW}/${review?.id}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...review,
        text,
      })
    });
  } catch (err) {
      console.error(err);
  }
};

export default fetchReviewTextUpdate;