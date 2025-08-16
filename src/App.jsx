import "./App.css";
import ToDo from "./components/ToDo";
import Auth from "./components/Auth";
import {useEffect, useState} from "react";
import supabase from "./supabase-client.js";

function App() {
    const [session, setSession] = useState(null);

    const fetchSession = async () => {
        const currentSession = await supabase.auth.getSession();
        console.log(currentSession);
        setSession(currentSession.data.session);
    }

    useEffect(() => {
        fetchSession();

        //Listener for login/logout to refresh page content
        const {data} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => {
            data.subscription.unsubscribe();    //prevent memory leaks
        }
    }, []);

    const logout = async ()=>{
        await supabase.auth.signOut();
    }

    return (
        <>
            {session ? (
                <>
                    <button onClick={logout} style={{backgroundColor: 'red'}}>Log Out</button>
                    <ToDo session={session} />
                </>
            ):(
                <Auth/>
            )}
        </>
    );
}
export default App;
