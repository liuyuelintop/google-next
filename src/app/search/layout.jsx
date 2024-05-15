import SearchHeader from "@/components/SearchHeader";
import { Suspense } from "react";
import Loading from "./web/loading";

export default function layout({ children }) {
    return (
        <div>
            <SearchHeader />
            <Suspense fallback={<div>
                Loading...
            </div>}>
                {children}
            </Suspense>
        </div>
    )
}
