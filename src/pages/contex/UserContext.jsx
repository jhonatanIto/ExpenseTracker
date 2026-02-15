import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCards } from "../utils/fetchData";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("userExpense");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedToken = localStorage.getItem("tokenExpense");
    if (savedToken) setToken(savedToken);
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    setCards([]);

    localStorage.removeItem("userExpense");
    localStorage.removeItem("tokenExpense");
    localStorage.removeItem("Expenses");
  };

  const login = (data, token) => {
    localStorage.setItem("userExpense", JSON.stringify(data));
    localStorage.setItem("tokenExpense", token);
    setUser(data);
    setToken(token);
  };

  const loadCards = async () => {
    if (!token) return;

    const cardData = await fetchCards(token);
    if (!cardData) return;
    setCards(cardData);
    localStorage.setItem("Expenses", JSON.stringify(cardData));
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, cards, setCards, loadCards }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
