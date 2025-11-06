export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex items-center gap-3">
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce"></div>
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce delay-100"></div>
        <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce delay-200"></div>
      </div>
    </div>
  )
}
