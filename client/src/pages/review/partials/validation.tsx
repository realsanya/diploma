import { useSelector } from 'react-redux';
import { Formik } from 'formik';

const Validation = () => {

  const currentReview = useSelector((state: any) => state.currentReview);

  return (
    <div>
      Validation {currentReview?.review?.name}
    </div>
  )

  // return (
  //   <Formik
  //     initialValues={{
  //       name: 'New peer review'
  //     }}
  //     onSubmit={() => {}}
  //   >
  //     GeneralInfo
  //   </Formik>
  // )
};

export default Validation;