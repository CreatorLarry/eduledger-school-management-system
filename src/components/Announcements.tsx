const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">Announcements</div>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">Parent-Teacher Conference Day</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2026-01-10</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Discussion of student progress and academic goals for the
                        upcoming semester.</p>
                </div>
                <div className="bg-lamaPurpleLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium ">Literature Day</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2026-01-20</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Bring a book to school day</p>
                </div>
                <div className="bg-lamaYellowLight rounded-md p-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium  ">Science & Tech Fair</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">2026-01-10</span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">Students will showcase their innovative projects and
                        experiments in the gymnasium.</p>
                </div>
            </div>
        </div>
    )
}
export default Announcements
