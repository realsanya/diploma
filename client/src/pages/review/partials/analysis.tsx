import { useSelector } from 'react-redux';
import { Formik } from 'formik';

const Analysis = () => {

  const currentReview = useSelector((state: any) => state.currentReview);

  return (
    <div>
      Analysis {currentReview?.review?.name}
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

export default Analysis;