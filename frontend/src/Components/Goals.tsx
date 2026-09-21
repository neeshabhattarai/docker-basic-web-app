import { useEffect, useState } from "react";

const Goals = () => {
  const [goal, setGoal] = useState("");
  const [goals, setGoals] = useState<{_id:string,title:string}[]>([]);
  useEffect(() => {
    const fetchGoals = async () => {
      const response = await fetch("http://localhost:3000/goals");
      const data = await response.json();
      console.log(data);
      setGoals(data);
    };
    fetchGoals();
  }, []);

  const deleteGoal = async (goal: string) => {
  await fetch(`http://localhost:3000/goals`, {
      method: "DELETE",
      body: JSON.stringify({ _id: goal }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("http://localhost:3000/goals", {
      method: "POST",
      body: JSON.stringify({ title:goal }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setGoal("");
  };
  return (
    <form
      className=" p-4 bg-indigo-300 border-gray-300 rounded-md text-black "
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold text-center mb-4">Goals</h1>
      <input
        type="text"
        placeholder="Enter your goal"
        className="w-full p-2 border border-gray-300 rounded-md mb-4"
        onChange={(e) => setGoal(e.target.value)}
        value={goal}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Submit
      </button>
      <div className="pt-4 text-2xl font-bold">List of goals</div>
      <ul>
        {goals.map((goal) => (
          <li key={goal._id} onClick={() => deleteGoal(goal._id)}>
            {goal.title}
          </li>
        ))}
      </ul>
    </form>
  );
};

export default Goals;
