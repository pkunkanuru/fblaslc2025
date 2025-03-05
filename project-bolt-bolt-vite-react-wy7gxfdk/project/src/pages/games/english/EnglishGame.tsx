import React, { useState, useEffect } from 'react';

interface EnglishGameProps {
  gameId?: string;
  onScoreChange: (score: number) => void;
  onLifeLost: () => void;
}

interface MatchingCard {
  id: number;
  content: string;
  type: 'word' | 'definition';
  isFlipped: boolean;
  isMatched: boolean;
  matchId: number;
}

const games = {
  'word-match': {
    pairs: [
      { word: 'Serendipity', definition: 'Finding something good without looking for it', id: 1 },
      { word: 'Ephemeral', definition: 'Lasting for a very short time', id: 2 },
      { word: 'Resilient', definition: 'Able to recover quickly from difficulties', id: 3 },
      { word: 'Eloquent', definition: 'Fluent and persuasive in speaking or writing', id: 4 },
      { word: 'Enigmatic', definition: 'Difficult to interpret or understand', id: 5 },
      { word: 'Mellifluous', definition: 'Sweet or musical; pleasant to hear', id: 6 },
    ]
  },
  'word-wizard': {
    words: [
      { word: 'happiness', definition: 'The state of being happy' },
      { word: 'adventure', definition: 'An exciting or dangerous experience' },
      { word: 'courage', definition: 'The ability to face danger or difficulties' }
    ]
  },
  'grammar-hero': {
    sentences: [
      { 
        text: 'The cat ___ on the mat',
        options: ['is', 'are', 'were', 'been'],
        correct: 'is'
      },
      {
        text: 'They ___ to the store yesterday',
        options: ['go', 'goes', 'went', 'gone'],
        correct: 'went'
      }
    ]
  }
};

const shuffleArray = (array: any[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const createMatchingCards = (pairs: typeof games['word-match']['pairs']): MatchingCard[] => {
  const cards: MatchingCard[] = [];
  pairs.forEach(pair => {
    cards.push(
      { id: pair.id * 2 - 1, content: pair.word, type: 'word', isFlipped: false, isMatched: false, matchId: pair.id },
      { id: pair.id * 2, content: pair.definition, type: 'definition', isFlipped: false, isMatched: false, matchId: pair.id }
    );
  });
  return shuffleArray(cards);
};

const EnglishGame: React.FC<EnglishGameProps> = ({ gameId, onScoreChange, onLifeLost }) => {
  const [cards, setCards] = useState<MatchingCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (gameId === 'word-match') {
      setCards(createMatchingCards(games['word-match'].pairs));
    }
  }, [gameId]);

  const handleCardClick = (cardId: number) => {
    if (isChecking || flippedCards.length === 2 || 
        cards.find(c => c.id === cardId)?.isMatched || 
        flippedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = cards.filter(card => 
        newFlippedCards.includes(card.id)
      );

      if (firstCard.matchId === secondCard.matchId) {
        setTimeout(() => {
          setCards(cards.map(card => 
            newFlippedCards.includes(card.id) 
              ? { ...card, isMatched: true }
              : card
          ));
          setFlippedCards([]);
          setMatchedPairs(prev => prev + 1);
          setScore(prev => prev + 10);
          onScoreChange(score + 10);
          setIsChecking(false);
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          onLifeLost();
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const renderMatchingGame = () => (
    <div className="grid grid-cols-2 gap-4 w-full max-w-lg mx-auto">
      {cards.map(card => (
        <button
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className={`aspect-[3/2] rounded-xl p-4 flex items-center justify-center text-center transition-all duration-300 transform ${
            card.isMatched || flippedCards.includes(card.id)
              ? 'bg-emerald-100 shadow-lg scale-95'
              : 'bg-white shadow-md hover:shadow-lg hover:scale-105'
          } ${
            card.type === 'definition' ? 'text-sm' : 'text-lg font-semibold'
          }`}
          disabled={card.isMatched || isChecking}
        >
          {card.isMatched || flippedCards.includes(card.id) ? card.content : '?'}
        </button>
      ))}
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameId || gameId === 'word-match') return;

    let isCorrect = false;
    
    switch (gameId) {
      case 'word-wizard':
        const currentWord = games['word-wizard'].words[0];
        isCorrect = userInput.toLowerCase() === currentWord.word.toLowerCase();
        break;
      case 'grammar-hero':
        const currentSentence = games['grammar-hero'].sentences[0];
        isCorrect = userInput === currentSentence.correct;
        break;
    }

    if (isCorrect) {
      setFeedback('Correct! 🎉');
      setScore(s => s + 10);
      onScoreChange(score + 10);
      setTimeout(() => {
        setUserInput('');
        setFeedback('');
      }, 1500);
    } else {
      setFeedback('Try again! 😢');
      onLifeLost();
    }
  };

  if (gameId === 'word-match') {
    return (
      <div className="p-4 flex flex-col items-center space-y-6">
        <div className="w-full">
          <h2 className="text-2xl font-bold text-center mb-2">Word Matching</h2>
          <p className="text-gray-600 text-center mb-6">Match the words with their definitions</p>
          {renderMatchingGame()}
          {matchedPairs === games['word-match'].pairs.length && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-emerald-600">Congratulations! 🎉</h3>
              <p className="text-gray-600">You've matched all the pairs!</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="w-full max-w-md space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            {gameId === 'word-wizard' && (
              <>
                <h2 className="text-xl font-bold text-center mb-4">
                  Definition: {games['word-wizard'].words[0].definition}
                </h2>
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter the word"
                />
              </>
            )}
            {gameId === 'grammar-hero' && (
              <>
                <h2 className="text-xl font-bold text-center mb-4">
                  {games['grammar-hero'].sentences[0].text}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {games['grammar-hero'].sentences[0].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setUserInput(option)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        userInput === option 
                          ? 'bg-blue-50 border-blue-500 text-blue-700' 
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-500 transition-colors"
            >
              Submit
            </button>
          </form>

          {feedback && (
            <div className={`mt-4 text-center font-medium ${
              feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnglishGame;