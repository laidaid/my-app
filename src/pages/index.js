import Head from "next/head";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthUserContext";
import { useUserStore } from "@/libs/store";
import useFirebaseAuth from "@/libs/useFirebaseAuth";
import { onAuthStateChanged, signOut, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/configs/firebase";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import CustomEditor from "@/components/tinymce/CustomEditor";

export default function HomePage() {
    // const { authUser, signOutApp } = useAuth();
    const { signOutApp } = useFirebaseAuth();
    const { user, setUser } = useUserStore();
    const [email, setEmail] = useState("loading...");
    const [email2, setEmail2] = useState("loading...");

    useEffect(() => {
        const handleUser = (user) => {
            if (user) {
                setEmail(user?.email);
            } else {
                setEmail("Thất bại");
            }
        };
        const handleUser2 = (user) => {
            if (user) {
                setEmail2(user?.email);
            } else {
                setEmail2("That bai");
            }
        };
        // const unsubscribe = () => 
        onAuthStateChanged(auth, handleUser);
        // const unsubscribe2 = () => 
        onIdTokenChanged(auth, handleUser2);
        // return () => {
        //     unsubscribe();
        //     unsubscribe2();
        // };
    }, []);

    return (
        <>
            <Head>
                <title>DaiLai 9966</title>
            </Head>
            <main>
                <button className="btn btn-primary">Button</button>
                <div className="">
                    {user ? (
                        <button
                            className="btn btn-accent"
                            onClick={() => {
                                signOut(auth).then(() => {
                                    setUser(null);
                                    Cookies.remove("user");
                                });
                            }}
                        >
                            Sign out
                        </button>
                    ) : (
                        <Link href="/sign-in" className="btn btn-primary">
                            Sign in
                        </Link>
                    )}
                </div>
                {/* email: {authUser?.email} */}
                <div className="">email auth: {auth?.currentUser?.email}</div>
                <div className="">email2: {user?.email}</div>
                <div className="">email3: {email}</div>
                <div className="">email4: {email2}</div>
                <div className="">
                    <Link href="/admin" className="btn">
                        Admin
                    </Link>
                </div>
                <CustomEditor />
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">What is your name?</span>
                        <span className="label-text-alt">Top Right label</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs appearance-none"
                    />
                    <label className="label">
                        <span className="label-text-alt">
                            Bottom Left label
                        </span>
                        <span className="label-text-alt">
                            Bottom Right label
                        </span>
                    </label>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your bio</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <textarea
                        className="textarea textarea-bordered h-24 text-base appearance-none"
                        placeholder="Bio"
                    ></textarea>
                    <label className="label">
                        <span className="label-text-alt">Your bio</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick a file</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <input
                        accept="image/*"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        <span className="label-text-alt">Alt label</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Pick a file</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                    <input
                        accept="video/*"
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs"
                    />
                    <label className="label">
                        <span className="label-text-alt">Alt label</span>
                        <span className="label-text-alt">Alt label</span>
                    </label>
                </div>
            </main>
        </>
    );
}

// HomePage.getLayout = (page) => <BaseLayout>{page}</BaseLayout>;
