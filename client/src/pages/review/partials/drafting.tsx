import { useSelector } from 'react-redux';
import TextEditor from 'modules/text-editor';

const Drafting = () => {
  const currentReview = useSelector((state: any) => state.currentReview);

  return (
    <TextEditor keywords={currentReview?.articleAnalyse?.keywords} />
  )
};

export default Drafting;