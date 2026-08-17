import {Link} from "react-router";
import {ArrowLeft} from "lucide-react";


const UnauthorizedPage = () => {
    return (
        <div className={'w-full max-w-xl bg-white p-8 rounded-lg flex flex-col items-center justify-center gap-4'}>
            Unauthorized - 403

            <button className={"flex items-center justify-center gap-0.5 p-1 border-2 border-blue-500 rounded-md"}>
                <ArrowLeft
                    className={'h-4 w-4 text-blue-500'}
                />
                <Link
                    to="/home"
                    className={'text-blue-500 text-sm font-semibold'}
                >
                    back to home
                </Link>
            </button>
        </div>
    );
};


export default UnauthorizedPage;