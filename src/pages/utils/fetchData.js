export const fetchCards = async (token) => {
  if (!token) return;

  try {
    const res = await fetch(
      "https://expensebackend-production-799f.up.railway.app/api/cards",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      console.error(data?.message);
      return;
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};
