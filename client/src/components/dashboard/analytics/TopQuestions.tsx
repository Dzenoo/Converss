type TopQuestionsProps = {
  topQuestions: { question: string; count: number; lastAsked: string }[];
};

const TopQuestions: React.FC<TopQuestionsProps> = ({ topQuestions }) => {
  return <div>TopQuestions</div>;
};

export default TopQuestions;
