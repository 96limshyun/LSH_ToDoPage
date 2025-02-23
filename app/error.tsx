"use client";

export default function Error({ reset }: { reset: () => void }) {
    return (
        <div className=" items-center justify-center text-white  p-6 gap-4">
            <div className="flex flex-col bg-defaultCard p-8 rounded-lg shadow-lg max-w-md w-full text-center gap-4">
                <h2 className="text-2xl font-semibold text-red-500">
                    🚨 오류 발생
                </h2>
                <p className="mt-4 text-gray-300">잠시 후 다시 시도해주세요.</p>

                <button
                    type="button"
                    onClick={reset}
                    className="m-auto w-20 p-2 bg-black rounded border-[0.5px] hover:bg-gray-500 text-blue-500 flex justify-center items-center"
                >
                    다시 시도
                </button>
            </div>
        </div>
    );
}
