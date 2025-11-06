export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a0a0a] to-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0 animate-pulse"></div>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-6 top-1/2 -translate-y-1/2 z-10 animate-pulse delay-300"></div>
        </div>
        <p className="text-white text-lg font-semibold">Loading Database...</p>
      </div>
    </div>
  )
}
