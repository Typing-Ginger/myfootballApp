import LoadingComponent from "../components/LoadingComponent";


export default function Loading() {
    return (
        <div className="flex flex-col w-full justify-center items-center h-screen">
            <LoadingComponent color="#00aa00" />
        </div>
    )
}