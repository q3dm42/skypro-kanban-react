import { createContext, useContext } from "react";

export const TaskContext = createContext();

// Hook для использования TaskContext
export const useTask = () => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error("useTask должен быть использован внутри TaskProvider");
	}
	return context;
};
