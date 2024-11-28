export const EventForm = () => (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
        <input 
          type="text" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
        <input 
          type="date" 
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" 
        />
      </div>
      <button 
        type="submit" 
        className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary/90"
      >
        Create Event
      </button>
    </form>
);