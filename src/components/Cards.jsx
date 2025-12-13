export default function Cards(props) {
  const { cards, openCardInfo } = props;
  return (
    <>
      {cards.map((card, index) => {
        return (
          <div onClick={openCardInfo} key={index} className="cardBox">
            <div>{card.name}</div>
            <div
              style={{
                color:
                  card.expense === "Expense"
                    ? "rgb(255, 56, 89)"
                    : "rgb(69, 214, 69)",
              }}
              className="cardGasto"
            >
              {card.expense === "Expense" ? "- " : ""}
              {card.amount}
            </div>
          </div>
        );
      })}
    </>
  );
}
