import { useSelector } from 'react-redux';
import { Formik } from 'formik';

const Drafting = () => {

  const currentReview = useSelector((state: any) => state.currentReview);

  return (
    <div>
      Drafting {currentReview?.review?.name}
    </div>
  )
};

export default Drafting;