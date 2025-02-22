"use client";

export default function User({userId}: {userId: string}) {
    return (
        <div>
            <div className="w-content">
                <p>User id {userId}</p>
            </div>
        </div>
    )
}
