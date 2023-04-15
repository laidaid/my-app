import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

const AdminApp = (props) => {
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/");
    }, [router]);

    // Listen for changes on loading and authUser, redirect if needed
    // useEffect(() => {
    //     if (!loading && !authUser) router.push("/");
    // }, [authUser, loading]);

    return (
        <>
            <Head>
                <title>Admin DaiLai 9966</title>
            </Head>
            <div className="">admin</div>
            <Link href='/' className="btn">Back Home</Link>
        </>
    );
};

export default AdminApp;
