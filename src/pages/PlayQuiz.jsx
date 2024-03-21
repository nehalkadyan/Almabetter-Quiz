import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PlayQuiz = () => {
  // accessing the quizzes from the redux store
  const { quizzes } = useSelector((state) => state.quiz);
  // filtering the quizzes on the basis of isActive property and storing it in a variable
  const playableQuizzes = quizzes.filter((quiz, id) => quiz.isActive === true);

  return (
    <div>
      <div className="p-12">
        <div className="mb-12 md:mb-4">
          <h1 className="text-3xl font-bold">PLay Quiz</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div>
            <h1 className="text-red-800 text-2xl font-semibold">
              Select a quiz to play🚀
            </h1>
            <div className="flex flex-col">
              {/* displaying the playable quizzes title*/}
              {playableQuizzes?.map((quiz, idx) => (
                <Link
                  to={`/play-quiz/${idx}`}
                  key={idx}
                  className="my-3 text-xl font-semibold cursor-pointer
                 hover:underline"
                >
                  {idx + 1 + ")"} {quiz.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <img
              src="https://media.istockphoto.com/id/1488144839/vector/quiz-logo-quiz-time-label-with-question-mark-quiz-emblem-for-business-marketing-and.jpg?s=612x612&w=0&k=20&c=eYgHRl9M7FtpLRCS-ZKABj3IU5E62cgGUTCY2HN5JO8="
              alt="playquiz"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayQuiz;
