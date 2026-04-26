import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import Dashboard from "./Dashboard";
import Login from "./Login"; // Aapka aesthetic login component import kiya

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <SignedOut>
        {/* Ab yahan wahi professional login dikhega jo aapne banaya hai */}
        <Login />
      </SignedOut>

      <SignedIn>
        {/* Dashboard load hone par user button top right mein rahega */}
        <div className="fixed top-10 right-28 z-50 scale-125">
          <UserButton afterSignOutUrl="/" />
        </div>
        <Dashboard />
      </SignedIn>
    </div>
  );
}