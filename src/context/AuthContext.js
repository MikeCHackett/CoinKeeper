import { createContext, useContext, useEffect, useState, useReducer } from "react";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from '../utility/Firebase';
import AppReducer from "./AppReducer";
import { nanoid } from "nanoid";

// Initial State
const initialState = {
    expenses: [],
};

// Create context
const UserContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {

    // useReducer to set initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // checks the current user
    const [currentUser, setCurrentUser] = useState();

    // create user function
    const createUser = async (email, password) => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          console.log("User has been successfully created");
        } catch (error) {
          console.log("Error while creating user:", error.message);
          throw error;
        }
      };

    // signin function
    const signIn = (email, password) => {
        return signInWithEmailAndPassword (auth, email, password)
    };

    // logout function
    const logout = () => {
        return signOut (auth)
    };

    // reset password function
    const resetPassword = (email) => {
        return sendPasswordResetEmail (auth, email)
    };

    // checks if user is logged in
    useEffect (() => {
        const unsubsribe = onAuthStateChanged (auth, (user) => {
            console.log('User has logged in:', user);
            setCurrentUser (user);
        });
        return () => {
            unsubsribe ();
        };
    });

    // actions
    function deleteExpense (id) {
        dispatch ({
            type: 'DELETE_EXPENSE',
            payload: id
        });
    } ;

    // add expense function
    function addExpense (expense) {
        const newExpense = {
            ...expense,
            id: nanoid()
        };
        dispatch ({
            type: 'ADD_EXPENSE',
            payload: newExpense
        })
    }

    // values persisting through context
    const value = {
        createUser,
        logout,
        signIn,
        resetPassword,
        currentUser,
        expenses: state.expenses,
        deleteExpense,
        addExpense,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(UserContext);
};