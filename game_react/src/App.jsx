import React, { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./App.css";

let cardImages = [
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/sword-1.png",
    matched: false,
  },
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/potion-1.png",
    matched: false,
  },
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/ring-1.png",
    matched: false,
  },
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/scroll-1.png",
    matched: false,
  },
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/helmet-1.png",
    matched: false,
  },
  {
    src: "https://react-memory-game-app-ct.netlify.app/img/shield-1.png",
    matched: false,
  },
];
export default function App() {
  const [card, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTow, setChoiceTow] = useState(null);
  const [choiceTree, setChoiceTree] = useState(null);
  const [disabled, setDisables] = useState(false);
  //כל אחד מהנתונים האלה צריך להיות ב-state כי:
  //cards משתנה במהלך המשחק (הכרטיסים מתערבבים, נבחרים, הופכים למותאמים).
  //turn משתנה לאחר כל סיבוב (המשחק מונה סיבובים).
  //choiceOne ו-choiceTwo משתנים כאשר המשתמש בוחר כרטיסים.
  //disabled משתנה כדי לשלוט אם ניתן לבחור כרטיסים.

  function shuffleCards() {
    const shuffleCards = [...cardImages, ...cardImages, ...cardImages]
      .sort(() => Math.random() - 0, 5)
      .map((card) => ({ ...card, id: Math.random() }));
    setChoiceOne(null);
    setChoiceTow(null);
    setChoiceTree(null);
    setCards(shuffleCards);
    setTurn(0);
  }
  function handleChoice(card) {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTow) {
      setChoiceTow(card);
    } else if (!choiceTree) {
      setChoiceTree(card);
    }
  }

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTow(null);
    setChoiceTree(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisables(false);
  }
  useEffect(() => {
    if (choiceOne && choiceTow && choiceTree) {
      setDisables(true);

      if (choiceOne.src === choiceTow.src && choiceOne.src === choiceTree.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTow, choiceTree]);

  useEffect(() => {
    shuffleCards();
  }, []);
  return (
    <>
      <div className="container">
        <h1>welcome to the game</h1>
        <p>turn:{turn}</p>
        <button onClick={shuffleCards}>new Game</button>
        <div className="card-grid">
          {card.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handChoice={handleChoice}
              flipped={
                card === choiceOne ||
                card === choiceTow ||
                card === choiceTree ||
                card.matched
              }
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </>
  );
}
