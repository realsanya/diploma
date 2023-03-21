import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import TextEditor from 'modules/text-editor';

const Drafting = () => {

  const currentReview = useSelector((state: any) => state.currentReview);

  return (
    // <div>
    //   Drafting {currentReview?.review?.name}

      <TextEditor />
    // </div>
  )
};

export default Drafting;